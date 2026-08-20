import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { assemblePrompt, clampCeiling } from "@/lib/chat/budget";
import { loadContextSubjects } from "@/lib/chat/subjects";
import { SYSTEM_PROMPT } from "@/lib/chat/prompt";
import type { PromptMessage } from "@/lib/chat/types";
import { z } from "zod";

const PrepareSchema = z.object({
  content: z.string().min(1),
  // The ceiling lives in the browser's localStorage, so it arrives untrusted
  // and is clamped by `clampCeiling` before it can size a query.
  contextTokens: z.number().optional(),
});

const TITLE_CHARS = 60;

function deriveTitle(question: string): string {
  const oneLine = question.replace(/\s+/g, " ").trim();
  return oneLine.length <= TITLE_CHARS ? oneLine : `${oneLine.slice(0, TITLE_CHARS).trimEnd()}…`;
}

/**
 * POST /api/chat/conversations/[id]/prepare
 *
 * Persists the question, then returns the complete message array for the
 * browser to post at the user's own LLM. The server never talks to the model —
 * it can't; the model is on the user's machine — so this is where all the
 * prompt construction happens.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = PrepareSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }
  const { content } = parsed.data;
  const ceiling = clampCeiling(parsed.data.contextTokens);

  const conversation = await prisma.conversation.findFirst({
    where: { id, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prior = conversation.messages;
  const last = prior[prior.length - 1];

  // A trailing USER message means the previous attempt never got a reply — the
  // stream died, or the user stopped it. Rewrite that turn instead of adding a
  // second one, so retrying (or rephrasing) can't fill the thread with
  // unanswered questions.
  const isRetry = last?.role === "USER";
  const history: PromptMessage[] = (isRetry ? prior.slice(0, -1) : prior).map((m) => ({
    role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
    content: m.content,
  }));

  const isFirstTurn = history.length === 0;
  const shouldTitle = isFirstTurn && conversation.title === "New chat";

  // The subject read doesn't depend on the write, so they overlap.
  const [subjects] = await Promise.all([
    loadContextSubjects(userId, conversation.contextSubjectIds, conversation.subjectId),
    prisma.$transaction([
      isRetry
        ? prisma.chatMessage.update({ where: { id: last.id }, data: { content } })
        : prisma.chatMessage.create({ data: { conversationId: id, role: "USER", content } }),
      prisma.conversation.update({
        where: { id },
        data: shouldTitle ? { title: deriveTitle(content) } : { updatedAt: new Date() },
      }),
    ]),
  ]);

  const { messages, budget } = assemblePrompt({
    systemPrompt: SYSTEM_PROMPT,
    subjects,
    history,
    question: content,
    ceiling,
  });

  return NextResponse.json({ messages, budget });
}
