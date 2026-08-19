import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { z } from "zod";

const CreateSchema = z.object({
  subjectId: z.string().nullable().optional(),
  contextSubjectIds: z.array(z.string()).optional(),
});

// GET /api/chat/conversations - the user's threads, newest activity first.
// Deliberately excludes messages: the list is a sidebar, not a transcript.
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, subjectId: true, contextSubjectIds: true, updatedAt: true },
  });

  return NextResponse.json(conversations);
}

// POST /api/chat/conversations - start a thread
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = CreateSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }
  const { subjectId = null, contextSubjectIds = [] } = parsed.data;

  // A subjectId from the client is just a routing hint; confirm it's theirs
  // before storing it, so a bad id can't attach someone else's subject.
  if (subjectId) {
    const owned = await prisma.subject.findFirst({ where: { id: subjectId, userId }, select: { id: true } });
    if (!owned) return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  const conversation = await prisma.conversation.create({
    data: { userId, subjectId, contextSubjectIds },
    select: { id: true, title: true, subjectId: true, contextSubjectIds: true, updatedAt: true },
  });

  return NextResponse.json(conversation, { status: 201 });
}
