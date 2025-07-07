import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import prisma from "@/lib/prisma"
import { z } from "zod"

const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  estimatedTime: z.number().int().positive().optional(),
})

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: token.id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(todos)
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const parsedBody = TodoSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsedBody.error.issues }, { status: 400 })
  }

  const todo = await prisma.todo.create({
    data: {
      ...parsedBody.data,
      userId: token.id as string,
    },
  })

  return NextResponse.json(todo, { status: 201 })
}
