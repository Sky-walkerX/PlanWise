import { type NextRequest, NextResponse } from "next/server";
import { addDays, addWeeks, addMonths } from "date-fns";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { Prisma, type Recurrence, type Task } from "@/app/generated/prisma";
import { setClause } from "@/lib/sql";
import { z } from "zod";

const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  isCompleted: z.boolean().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  estimatedTime: z.number().int().positive().nullable().optional(),
  milestoneId: z.string().nullable().optional(),
  timeSpent: z.number().int().nonnegative().nullable().optional(),
  recurrence: z.enum(["DAILY", "WEEKLY", "MONTHLY"]).nullable().optional(),
});

// Next due date for a recurring task: advance from `base` by one interval, then
// keep rolling forward until it lands in the future — so finishing a task never
// spawns one that's already overdue.
function nextDueDate(base: Date, recurrence: Recurrence): Date {
  const step = (d: Date) =>
    recurrence === "DAILY" ? addDays(d, 1) : recurrence === "WEEKLY" ? addWeeks(d, 1) : addMonths(d, 1);
  const now = new Date();
  let next = step(base);
  while (next <= now) next = step(next);
  return next;
}

// PUT /api/tasks/[id]
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = UpdateTaskSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const { dueDate, isCompleted, ...rest } = parsed.data;
  // Unchecked variant: we set the milestoneId foreign key as a scalar directly.
  const data: Prisma.TaskUncheckedUpdateInput = { ...rest };

  if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
  if (isCompleted !== undefined) {
    data.isCompleted = isCompleted;
    data.completedAt = isCompleted ? new Date() : null;
  }

  // Only completing a task can spawn a recurrence, and that's the one branch
  // needing the pre-update row. Every other edit (notes, title, priority, …)
  // skips this read and updates in a single round trip below.
  if (isCompleted !== true) {
    const set = setClause(data as Record<string, unknown>);
    if (!set) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

    // One round trip: ownership rides along in the WHERE, RETURNING hands back
    // the new row.
    const n = set.values.length;
    const [task] = await prisma.$queryRawUnsafe<Task[]>(
      `UPDATE "Task" SET ${set.clause} WHERE "id" = $${n + 1} AND "userId" = $${n + 2} RETURNING *`,
      ...set.values,
      id,
      userId,
    );
    if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(task);
  }

  const existing = await prisma.task.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Recurring tasks: when one flips incomplete -> complete, spawn the next
  // instance (no background job — regeneration happens right here).
  const justCompleted = !existing.isCompleted;
  const recurrence = rest.recurrence !== undefined ? rest.recurrence : existing.recurrence;
  const effectiveDue = dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : existing.dueDate;

  if (justCompleted && recurrence) {
    const [task] = await prisma.$transaction([
      prisma.task.update({ where: { id }, data }),
      prisma.task.create({
        data: {
          title: rest.title ?? existing.title,
          description: rest.description !== undefined ? rest.description : existing.description,
          priority: rest.priority ?? existing.priority,
          estimatedTime: rest.estimatedTime !== undefined ? rest.estimatedTime : existing.estimatedTime,
          milestoneId: rest.milestoneId !== undefined ? rest.milestoneId : existing.milestoneId,
          recurrence,
          subjectId: existing.subjectId,
          userId,
          // Keep the completed task's list position (order defaults to 0 and
          // would jump the new occurrence to the top).
          order: existing.order,
          dueDate: nextDueDate(effectiveDue ?? new Date(), recurrence),
        },
      }),
    ]);
    return NextResponse.json(task);
  }

  const task = await prisma.task.update({ where: { id }, data });
  return NextResponse.json(task);
}

// DELETE /api/tasks/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { count } = await prisma.task.deleteMany({ where: { id, userId } });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
