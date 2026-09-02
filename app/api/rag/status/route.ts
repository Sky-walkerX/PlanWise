import { type NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth";
import { diffFreshness, EMBEDDING_DIMS, EMBEDDING_MODEL, listLiveSources, listStoredChunkMeta } from "@/lib/rag/sources";

/**
 * GET /api/rag/status
 *
 * Compares live note text against stored vectors and reports what needs work.
 * A pure read: the orphan count it returns is a finding, not an action. The
 * deletion it used to perform inline now lives behind `POST /api/rag/sweep`,
 * which the indexing loop calls when this reports orphans — a GET that React
 * Query re-runs on every mount and refetch has no business deleting rows.
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [live, stored] = await Promise.all([listLiveSources(userId), listStoredChunkMeta(userId)]);
  const { indexed, stale, orphanedKeys } = diffFreshness(live, stored, EMBEDDING_MODEL);

  return NextResponse.json({
    total: live.length,
    indexed: indexed.length,
    stale: stale.length,
    orphaned: orphanedKeys.length,
    model: EMBEDDING_MODEL,
    dims: EMBEDDING_DIMS,
  });
}
