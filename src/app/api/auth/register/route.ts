import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ message: "Email already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    return NextResponse.json({ message: "User registered successfully", user: { name, email, role } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
