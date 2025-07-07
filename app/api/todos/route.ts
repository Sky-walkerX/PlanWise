import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schema to validate incoming todo data
const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  estimatedTime: z.number().int().positive().optional(),
});

// GET all todos for the logged-in user
export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: token.sub as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(todos);
}

// POST a new todo for the logged-in user
export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = TodoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.create({
    data: {
      ...parsed.data,
      userId: token.sub as string,
    },
  });

  return NextResponse.json(todo, { status: 201 });
}
