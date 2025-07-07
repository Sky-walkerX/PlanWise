import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the Zod schema for validating todo input
const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  estimatedTime: z.number().int().positive().optional(),
});

// GET /api/todos - Get all todos for the authenticated user
export async function GET(request: NextRequest) {
  console.log("\n--- [GET /api/todos] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", request.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    console.log("Token object returned by getToken:", token);

    if (!token?.sub) {
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. Fetching todos for user ID: ${token.sub}`);
    const todos = await prisma.todo.findMany({
      where: {
        userId: token.sub,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("An unexpected error occurred in /api/todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/todos - Create a new todo for the authenticated user
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = TodoSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({
        error: "Invalid data",
        issues: parsedBody.error.issues,
      }, { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: {
        ...parsedBody.data,
        userId: token.sub,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
