import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(1).optional(),
  contextSubjectIds: z.array(z.string()).optional(),
});

// GET /api/chat/conversations/[id] - the thread with its full transcript
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: { id, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(conversation);
}

// PUT /api/chat/conversations/[id] - rename, or change the context selection
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = UpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const { count } = await prisma.conversation.updateMany({ where: { id, userId }, data: parsed.data });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    select: { id: true, title: true, subjectId: true, contextSubjectIds: true, updatedAt: true },
  });
  return NextResponse.json(conversation);
}

// DELETE /api/chat/conversations/[id] - cascades its messages
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { count } = await prisma.conversation.deleteMany({ where: { id, userId } });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
