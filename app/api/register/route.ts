import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user in your database using your Prisma User model
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    })

    // Return a subset of user data, excluding sensitive information like password
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Something went wrong during registration" }, { status: 500 })
  }
}
