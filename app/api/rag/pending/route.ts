import { type NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth";
import { diffFreshness, EMBEDDING_MODEL, listLiveSources, listStoredChunkMeta } from "@/lib/rag/sources";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 200;

function parseLimit(raw: string | null): number {
  const n = raw ? Number(raw) : DEFAULT_LIMIT;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.floor(n));
}

/**
 * GET /api/rag/pending?limit=20
 *
 * Returns the chunks of every stale source, flattened, up to `limit`. The
 * chunking itself happened in `listLiveSources`. A source's chunks are never split across the
 * limit boundary: the walk stops *before* starting a new source once the
 * limit is already met, so the browser never receives a partial source to
 * embed and write half of.
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = parseLimit(request.nextUrl.searchParams.get("limit"));

  const [live, stored] = await Promise.all([listLiveSources(userId), listStoredChunkMeta(userId)]);
  const { stale } = diffFreshness(live, stored, EMBEDDING_MODEL);

  const pending: {
    source: string;
    sourceId: string;
    subjectId: string;
    ordinal: number;
    breadcrumb: string;
    content: string;
    contentHash: string;
  }[] = [];

  for (const entry of stale) {
    if (pending.length >= limit) break;

    // Already chunked by `listLiveSources`, which had to run the chunker
    // anyway to decide whether this source yields passages at all.
    for (const chunk of entry.chunks) {
      pending.push({
        source: entry.source,
        sourceId: entry.sourceId,
        subjectId: entry.subjectId,
        ordinal: chunk.ordinal,
        breadcrumb: chunk.breadcrumb,
        content: chunk.content,
        contentHash: entry.contentHash,
      });
    }
  }

  return NextResponse.json(pending);
}
