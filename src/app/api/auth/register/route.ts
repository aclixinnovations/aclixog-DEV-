// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb"; // adjust path if your DB connector is placed elsewhere
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Prevent duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user (role defaults to "owner" per schema)
    const user = await User.create({
      email,
      password: hash,
      name,
      // If you want to accept role from request, add role: body.role (careful)
    });

    // Respond without password
    const safe = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ success: true, user: safe }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
