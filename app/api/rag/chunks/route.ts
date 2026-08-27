import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { listLiveSources, sourceKey } from "@/lib/rag/sources";
import type { Prisma } from "@/app/generated/prisma";

const MAX_BATCH = 500;

const ChunkInputSchema = z.object({
  source: z.enum(["SUBJECT", "MILESTONE", "TASK", "SUBTASK", "RESOURCE"]),
  sourceId: z.string().min(1),
  ordinal: z.number().int().min(0),
  breadcrumb: z.string().min(1),
  content: z.string().min(1),
  contentHash: z.string().min(1),
  embedding: z.array(z.number()),
});

const PostSchema = z.object({
  model: z.string().min(1),
  dims: z.number().int().positive(),
  chunks: z.array(ChunkInputSchema).min(1).max(MAX_BATCH),
});

/**
 * POST /api/rag/chunks
 *
 * Writes embedded chunks, grouped by (source, sourceId): each group's
 * existing rows are deleted and replaced in one transaction (§6 — re-indexing
 * never upserts by ordinal, since a shorter re-chunk would leave surplus
 * high-ordinal rows behind).
 *
 * A group is rejected — not written, not erroring the whole request — when
 * its source record no longer exists, or when `contentHash` no longer
 * matches the live text. The latter means the user edited the note while
 * this batch was being embedded; writing it would mark stale content as
 * indexed and it would never be corrected. Rejecting leaves it stale, and the
 * next status check picks it up.
 *
 * `content` is trusted only within the caller's own account: every row is
 * scoped by `userId`, so the worst a tampered client achieves is poisoning
 * its own retrieval.
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = PostSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }
  const { model, dims, chunks } = parsed.data;

  const mismatched = chunks.find((c) => c.embedding.length !== dims);
  if (mismatched) {
    return NextResponse.json(
      { error: `Embedding length ${mismatched.embedding.length} does not match dims ${dims}` },
      { status: 400 },
    );
  }

  const live = await listLiveSources(userId);
  const liveByKey = new Map(live.map((l) => [sourceKey(l.source, l.sourceId), l]));

  const groups = new Map<string, typeof chunks>();
  for (const chunk of chunks) {
    const key = sourceKey(chunk.source, chunk.sourceId);
    const group = groups.get(key);
    if (group) group.push(chunk);
    else groups.set(key, [chunk]);
  }

  const ops: Prisma.PrismaPromise<unknown>[] = [];
  let written = 0;

  for (const [key, group] of groups) {
    const liveEntry = liveByKey.get(key);
    if (!liveEntry) continue; // source no longer exists — reject the group
    if (group.some((c) => c.contentHash !== liveEntry.contentHash)) continue; // edited mid-batch — reject

    const { source, sourceId } = group[0];
    ops.push(prisma.noteChunk.deleteMany({ where: { userId, source, sourceId } }));
    ops.push(
      prisma.noteChunk.createMany({
        data: group.map((c) => ({
          userId,
          subjectId: liveEntry.subjectId,
          source: c.source,
          sourceId: c.sourceId,
          ordinal: c.ordinal,
          breadcrumb: c.breadcrumb,
          content: c.content,
          contentHash: c.contentHash,
          embedding: c.embedding,
          embeddingModel: model,
          dims,
        })),
      }),
    );
    written += group.length;
  }

  if (ops.length > 0) await prisma.$transaction(ops);

  return NextResponse.json({ written });
}

/**
 * DELETE /api/rag/chunks
 *
 * Drops every chunk for the user, for a full rebuild (an embedding model
 * change, or the user asking for one from the settings sheet).
 */
export async function DELETE(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { count } = await prisma.noteChunk.deleteMany({ where: { userId } });
  return NextResponse.json({ deleted: count });
}
