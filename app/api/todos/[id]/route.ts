import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  isCompleted: z.boolean().optional(),
  estimatedTime: z.number().int().positive().optional(),
  timeSpent: z.number().int().nonnegative().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });
  if (!token?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const resolvedParams = await params;

  const todo = await prisma.todo.updateMany({
    where: {
      id: resolvedParams.id,
      userId: token.id,
    },
    data: {
      ...parsed.data,
      completedAt: parsed.data.isCompleted ? new Date() : null,
    },
  });

  return NextResponse.json(todo);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });
  if (!token?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resolvedParams = await params;
  const deleted = await prisma.todo.deleteMany({
    where: {
      id: resolvedParams.id,
      userId: token.id,
    },
  });

  return NextResponse.json({ success: true, deleted });
}
