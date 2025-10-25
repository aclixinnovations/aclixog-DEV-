import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

  // --- BEGIN REPLACE: token sign + cookie set block ---
import jwt from "jsonwebtoken"; // ensure this import exists at the top of the file

// Create token (server runtime - Node) using the same JWT_SECRET as middleware expects
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  // Fail safe: send server error if secret is not configured
  return new Response(JSON.stringify({ error: "Server misconfiguration: missing JWT_SECRET" }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

// sign payload - ensure you include `role` in the payload
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role, // must be "user" | "admin" | "owner"
  },
  jwtSecret,
  { expiresIn: "7d" }
);

// set cookie `token` (HTTP-only, Secure in production)
const cookieOptions = [
  `token=${token}`,
  `Path=/`,
  `HttpOnly`,
  `Max-Age=${7 * 24 * 60 * 60}`, // 7 days in seconds
  `SameSite=Lax`,
];

// If you use HTTPS in production, add `Secure` flag for Vercel
if (process.env.NODE_ENV === "production") {
  cookieOptions.push("Secure");
}

// Return response with cookie set (adjust depending on how your route responds)
return new Response(JSON.stringify({ success: true }), {
  status: 200,
  headers: {
    "content-type": "application/json",
    "Set-Cookie": cookieOptions.join("; "),
  },
});
// --- END REPLACE ---
    
    return NextResponse.json({
      message: "Login successful",
      token,
      user: { name: user.name, role: user.role, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
