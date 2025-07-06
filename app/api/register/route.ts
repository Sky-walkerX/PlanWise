// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Instantiate Prisma Client

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is a good salt rounds value

    // Create the user in your database using your Prisma User model
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null, // Use name if provided, otherwise null as per schema
        // Default values for createdAt, updatedAt, id, xp, level, streak, lastActiveDate
        // are handled by Prisma's @default and @updatedAt directives in your schema.
      },
    });

    // Return a subset of user data, excluding sensitive information like password
    return NextResponse.json({
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    // Provide a generic error message for security
    return NextResponse.json(
      { message: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}