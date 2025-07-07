import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  estimatedTime: z.number().int().positive().optional(),
});

export async function GET(request: NextRequest) {
  console.log("\n--- [GET /api/todos] Handler Triggered ---");

  try {
    // Log 1: Check if the cookie is being sent from the browser
    console.log("Incoming request headers:", request.headers);

    // Log 2: Check what the serverless function sees for the secret variables
    // THIS IS THE MOST IMPORTANT LOG. ONE OF THESE IS LIKELY UNDEFINED.
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);
    console.log("Value of process.env.NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
    
    // The getToken function will use one of the secrets above to decrypt the cookie
    const token = await getToken({ 
      req: request,
      // You can explicitly tell it which secret to use for a definitive test
      // secret: process.env.NEXTAUTH_SECRET 
    });

    // Log 3: Check what `getToken` returns. Is it a valid token or null?
    console.log("Token object returned by getToken:", token);

    if (!token?.id) {
      console.error("Validation failed: Token is null or does not contain an ID. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. Fetching todos for user ID: ${token.id}`);
    const todos = await prisma.todo.findMany({
      where: {
        userId: token.id as string,
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

// You can add similar logging to your POST function if needed
export async function POST(request: NextRequest) {
  // ... similar logging here ...
  const token = await getToken({ req: request });
  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsedBody = TodoSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsedBody.error.issues }, { status: 400 });
  }
  const todo = await prisma.todo.create({
    data: {
      ...parsedBody.data,
      userId: token.id as string,
    },
  });
  return NextResponse.json(todo, { status: 201 });
}