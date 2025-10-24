"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      document.cookie = `token=${data.token}; path=/;`;
      router.push("/app"); // redirect to dashboard
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-72">
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="border p-2 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
