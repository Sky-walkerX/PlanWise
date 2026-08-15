import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { setClause } from "@/lib/sql";
import type { Subtask } from "@/app/generated/prisma";
import { z } from "zod";

const UpdateSubtaskSchema = z.object({
  title: z.string().min(1).optional(),
  notes: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().optional(),
});

// PUT /api/subtasks/[id] - update title/notes/completion/order.
// Scoped through task -> subject -> user (subtasks carry no userId).
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = UpdateSubtaskSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const { isCompleted, ...rest } = parsed.data;
  const data: { title?: string; notes?: string; order?: number; isCompleted?: boolean; completedAt?: Date | null } = {
    ...rest,
  };
  if (isCompleted !== undefined) {
    data.isCompleted = isCompleted;
    data.completedAt = isCompleted ? new Date() : null;
  }

  const set = setClause(data);
  if (!set) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  // One round trip: ownership rides along in the WHERE (a row that isn't the
  // caller's simply doesn't match), and RETURNING hands back the new row.
  const n = set.values.length;
  const [subtask] = await prisma.$queryRawUnsafe<Subtask[]>(
    `UPDATE "Subtask" s SET ${set.clause}
     FROM "Task" t, "Subject" sub
     WHERE s."id" = $${n + 1}
       AND t."id" = s."taskId"
       AND sub."id" = t."subjectId"
       AND sub."userId" = $${n + 2}
     RETURNING s.*`,
    ...set.values,
    id,
    userId,
  );
  if (!subtask) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(subtask);
}

// DELETE /api/subtasks/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { count } = await prisma.subtask.deleteMany({
    where: { id, task: { subject: { userId } } },
  });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
