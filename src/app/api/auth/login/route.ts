// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb"; // adjust if your DB connector is elsewhere
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("Missing JWT_SECRET on server");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Build cookie
    const cookieParts = [
      `token=${token}`,
      `Path=/`,
      `HttpOnly`,
      `Max-Age=${7 * 24 * 60 * 60}`, // 7 days
      `SameSite=Lax`,
    ];

    if (process.env.NODE_ENV === "production") cookieParts.push("Secure");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieParts.join("; "),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
