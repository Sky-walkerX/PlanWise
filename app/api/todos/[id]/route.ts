import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the Zod schema for updating todo input
const UpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  isCompleted: z.boolean().optional(),
  estimatedTime: z.number().int().positive().optional(),
  timeSpent: z.number().int().nonnegative().optional(),
});

// PUT /api/todos/:id - Update a specific todo for the authenticated user
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Log the start of the PUT handler
  console.log("\n--- [PUT /api/todos/:id] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", req.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the JWT token from the request, explicitly providing the secret
    const token = await getToken({
      req: req,
      secret: process.env.AUTH_SECRET,
    });

    console.log("Token object returned by getToken:", token);

    // Check if the token exists and has a 'sub' (subject/user ID)
    if (!token?.sub) {
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User ID from token: ${token.sub}`);

    // Parse the request body using the Zod schema
    const body = await req.json();
    const parsed = UpdateSchema.safeParse(body);

    // If validation fails, return a 400 error with issues
    if (!parsed.success) {
      console.error("Invalid data for todo update:", parsed.error.flatten());
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // Extract the todo ID from the URL parameters
    const todoId = params.id;
    console.log(`Attempting to update todo with ID: ${todoId} for user: ${token.sub}`);

    // Update the todo in the database, ensuring it belongs to the authenticated user
    const todo = await prisma.todo.updateMany({
      where: {
        id: todoId,
        userId: token.sub, // Ensure the todo belongs to the authenticated user
      },
      data: {
        ...parsed.data,
        // Set completedAt if isCompleted is true, otherwise null
        completedAt: parsed.data.isCompleted ? new Date() : null,
      },
    });

    console.log("Todo update result:", todo);
    // Return the updated todo (or a success message)
    return NextResponse.json(todo);
  } catch (error) {
    console.error("An unexpected error occurred in PUT /api/todos/:id:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/todos/:id - Delete a specific todo for the authenticated user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Log the start of the DELETE handler
  console.log("\n--- [DELETE /api/todos/:id] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", req.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the JWT token from the request, explicitly providing the secret
    const token = await getToken({
      req: req,
      secret: process.env.AUTH_SECRET,
    });

    console.log("Token object returned by getToken:", token);

    // Check if the token exists and has a 'sub' (subject/user ID)
    if (!token?.sub) {
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User ID from token: ${token.sub}`);

    // Extract the todo ID from the URL parameters
    const todoId = params.id;
    console.log(`Attempting to delete todo with ID: ${todoId} for user: ${token.sub}`);

    // Delete the todo from the database, ensuring it belongs to the authenticated user
    const deleted = await prisma.todo.deleteMany({
      where: {
        id: todoId,
        userId: token.sub, // Ensure the todo belongs to the authenticated user
      },
    });

    console.log("Todo deletion result:", deleted);
    // Return a success message and the count of deleted records
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("An unexpected error occurred in DELETE /api/todos/:id:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
