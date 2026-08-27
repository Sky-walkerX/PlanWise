import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { z } from "zod";

const MessageSchema = z.object({
  content: z.string().min(1),
  model: z.string().optional(),
  // Breadcrumbs of the passages retrieval selected for this reply, so history
  // shows what an old answer cited. Empty on digest-mode replies.
  sources: z.array(z.string()).optional(),
});

/**
 * POST /api/chat/conversations/[id]/messages
 *
 * Records the assistant's reply once the browser has finished streaming it.
 * If the stream dies first this is never called, and the thread simply ends on
 * a user turn — which `prepare` treats as a retry.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = MessageSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  // Ownership is folded into the write: no row is created unless the update
  // matched a conversation belonging to this user.
  const { count } = await prisma.conversation.updateMany({
    where: { id, userId },
    data: { updatedAt: new Date() },
  });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const message = await prisma.chatMessage.create({
    data: {
      conversationId: id,
      role: "ASSISTANT",
      content: parsed.data.content,
      model: parsed.data.model ?? null,
      sources: parsed.data.sources ?? [],
    },
  });

  return NextResponse.json(message, { status: 201 });
}
