"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const router = useRouter();

  async function handleRegister(e: any) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registered successfully!");
      router.push("/authentication/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-72">
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required className="border p-2 rounded"/>
        <input type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required className="border p-2 rounded"/>
        <input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required className="border p-2 rounded"/>
        <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} className="border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
