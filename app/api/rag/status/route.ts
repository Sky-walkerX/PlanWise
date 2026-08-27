import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { diffFreshness, EMBEDDING_DIMS, EMBEDDING_MODEL, listLiveSources, listStoredChunkMeta } from "@/lib/rag/sources";

/**
 * GET /api/rag/status
 *
 * Compares live note text against stored vectors and reports what needs
 * work. Runs the sweep from §7.3 as a side effect: a stored chunk whose
 * source no longer exists is deleted here rather than merely counted, since
 * this check already has both sides of the comparison in hand.
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [live, stored] = await Promise.all([listLiveSources(userId), listStoredChunkMeta(userId)]);
  const { indexed, stale, orphanedKeys } = diffFreshness(live, stored, EMBEDDING_MODEL);

  if (orphanedKeys.length > 0) {
    await prisma.$transaction(
      orphanedKeys.map((key) =>
        prisma.noteChunk.deleteMany({ where: { userId, source: key.source, sourceId: key.sourceId } }),
      ),
    );
  }

  return NextResponse.json({
    total: live.length,
    indexed: indexed.length,
    stale: stale.length,
    orphaned: orphanedKeys.length,
    model: EMBEDDING_MODEL,
    dims: EMBEDDING_DIMS,
  });
}
