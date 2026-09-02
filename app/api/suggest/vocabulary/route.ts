import { type NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth";
import { loadVocabularySource } from "@/lib/notes/corpus";
import { buildVocabulary } from "@/lib/notes/phrases";

/**
 * GET /api/suggest/vocabulary?subjectId=<id>
 *
 * The phrases the notes editor completes from. Mining happens here rather
 * than in the browser because the corpus is the user's whole account and the
 * output is a few hundred short strings — sending the phrases costs far less
 * than sending the notes they came from.
 *
 * Omitting `subjectId` mines every unarchived subject, which is what a note
 * outside a subject page gets.
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const subjectId = request.nextUrl.searchParams.get("subjectId");
  const source = await loadVocabularySource(userId, subjectId);

  return NextResponse.json({ phrases: buildVocabulary(source) });
}
