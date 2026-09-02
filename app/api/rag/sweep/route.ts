import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { diffFreshness, EMBEDDING_MODEL, listLiveSources, listStoredChunkMeta } from "@/lib/rag/sources";

/**
 * POST /api/rag/sweep
 *
 * Deletes stored chunks whose source record no longer exists — the §7.3
 * sweep. Split out of `/api/rag/status` so that reporting state and changing
 * it are separate requests: status is polled, this is called once, only when
 * status says there is something to clean up.
 *
 * Orphans come from deleting a milestone, task, subtask or resource, or from
 * clearing a note's text. Subject and account deletion cascade in the schema
 * and never reach here.
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [live, stored] = await Promise.all([listLiveSources(userId), listStoredChunkMeta(userId)]);
  const { orphanedKeys } = diffFreshness(live, stored, EMBEDDING_MODEL);

  if (orphanedKeys.length === 0) return NextResponse.json({ deleted: 0 });

  const results = await prisma.$transaction(
    orphanedKeys.map((key) =>
      prisma.noteChunk.deleteMany({ where: { userId, source: key.source, sourceId: key.sourceId } }),
    ),
  );

  return NextResponse.json({ deleted: results.reduce((sum, r) => sum + r.count, 0) });
}
