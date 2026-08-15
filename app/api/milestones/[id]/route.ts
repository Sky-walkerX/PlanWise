import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { setClause } from "@/lib/sql";
import type { Milestone } from "@/app/generated/prisma";
import { z } from "zod";

const UpdateMilestoneSchema = z.object({
  title: z.string().min(1).optional(),
  notes: z.string().optional(),
  order: z.number().int().optional(),
  isCompleted: z.boolean().optional(),
});

// Ownership for a milestone is enforced through its subject's userId — folded
// into each statement's WHERE rather than checked in a separate round trip.

// PUT /api/milestones/[id] - update title/notes/order/completion
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const parsed = UpdateMilestoneSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const set = setClause(parsed.data);
  if (!set) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  // One round trip: ownership rides along in the WHERE, RETURNING hands back
  // the new row. `updatedAt` is @updatedAt, which only Prisma's own writes
  // maintain — a raw UPDATE has to set it explicitly. The column is `timestamp
  // without time zone` holding UTC, so a bare NOW() would write the server's
  // local wall clock into it; `AT TIME ZONE 'UTC'` keeps it consistent with
  // every timestamp Prisma writes.
  const n = set.values.length;
  const [milestone] = await prisma.$queryRawUnsafe<Milestone[]>(
    `UPDATE "Milestone" m SET ${set.clause}, "updatedAt" = (NOW() AT TIME ZONE 'UTC')
     FROM "Subject" sub
     WHERE m."id" = $${n + 1}
       AND sub."id" = m."subjectId"
       AND sub."userId" = $${n + 2}
     RETURNING m.*`,
    ...set.values,
    id,
    userId,
  );
  if (!milestone) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(milestone);
}

// DELETE /api/milestones/[id] - its tasks survive (milestoneId set to null)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { count } = await prisma.milestone.deleteMany({ where: { id, subject: { userId } } });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
