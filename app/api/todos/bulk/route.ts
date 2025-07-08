import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Zod schema for validating bulk todo creation input
const BulkCreateSchema = z.array(
  z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
    estimatedTime: z.number().int().positive().optional(),
    isAiSuggested: z.boolean().default(false),
  }),
);

// Zod schema for validating bulk todo update input
const BulkUpdateSchema = z.object({
  todoIds: z.array(z.string()),
  updates: z.object({
    isCompleted: z.boolean().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().datetime().optional(),
    isAiSuggested: z.boolean().optional(),
  }),
});

// POST /api/todos/bulk - Create multiple new todos for the authenticated user
export async function POST(request: NextRequest) {
  console.log("\n--- [POST /api/todos/bulk] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", request.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the JWT token from the request, explicitly providing the secret
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET, // Ensure the secret is explicitly provided
    });

    console.log("Token object returned by getToken:", token);

    // Check if the token exists and has a 'sub' (subject/user ID)
    if (!token?.sub) { // Changed from token?.id to token?.sub for consistency
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User ID from token: ${token.sub}`);

    // Parse the request body using the Zod schema for bulk creation
    const body = await request.json();
    console.log("Received body for bulk create:", body);
    const parsedBody = BulkCreateSchema.safeParse(body);

    // If validation fails, return a 400 error with issues
    if (!parsedBody.success) {
      console.error("Invalid data for bulk create:", parsedBody.error.issues);
      return NextResponse.json({ error: "Invalid data", issues: parsedBody.error.issues }, { status: 400 });
    }

    // Create multiple todos in the database
    const todos = await prisma.todo.createMany({
      data: parsedBody.data.map((todo) => ({
        ...todo,
        userId: token.sub as string, // Ensure userId is from token.sub
      })),
    });

    console.log("Bulk create result:", todos);
    return NextResponse.json(todos, { status: 201 });
  } catch (error) {
    console.error("An unexpected error occurred in POST /api/todos/bulk (Bulk create error):", error);
    return NextResponse.json({ error: "Failed to create todos" }, { status: 500 });
  }
}

// PUT /api/todos/bulk - Update multiple todos for the authenticated user
export async function PUT(request: NextRequest) {
  console.log("\n--- [PUT /api/todos/bulk] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", request.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the JWT token from the request, explicitly providing the secret
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET, // Ensure the secret is explicitly provided
    });

    console.log("Token object returned by getToken:", token);

    // Check if the token exists and has a 'sub' (subject/user ID)
    if (!token?.sub) { // Changed from token?.id to token?.sub for consistency
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User ID from token: ${token.sub}`);

    // Parse the request body using the Zod schema for bulk update
    const body = await request.json();
    console.log("Received body for bulk update:", body);
    const parsedBody = BulkUpdateSchema.safeParse(body);

    // If validation fails, return a 400 error with issues
    if (!parsedBody.success) {
      console.error("Invalid data for bulk update:", parsedBody.error.issues);
      return NextResponse.json({ error: "Invalid data", issues: parsedBody.error.issues }, { status: 400 });
    }

    const { todoIds, updates } = parsedBody.data;
    console.log(`Attempting to bulk update todos with IDs: ${todoIds.join(', ')} for user: ${token.sub}`);

    // Perform the bulk update in the database
    const result = await prisma.todo.updateMany({
      where: {
        id: { in: todoIds },
        userId: token.sub as string, // Ensure todos belong to the authenticated user
      },
      data: {
        ...updates,
        // Set completedAt if isCompleted is true, otherwise null
        completedAt: updates.isCompleted ? new Date() : null,
      },
    });

    console.log("Bulk update result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("An unexpected error occurred in PUT /api/todos/bulk (Bulk update error):", error);
    return NextResponse.json({ error: "Failed to update todos" }, { status: 500 });
  }
}
