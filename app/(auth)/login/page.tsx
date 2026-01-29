"use client";

import { loginUser } from "@/app/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  //   const router = useRouter();'
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   async function handleLogin(formData: FormData) {
//     try {
//       const response = await loginUser({ email, password });

//       // ✅ Save token
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("user", JSON.stringify(response.user));

//       router.push("/dashboard");
//     } catch (err) {
//       console.log("Login error:", err);
//     }
//   }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // 🔥 THIS FIXES EVERYTHING

  await login({ email, password });
};

  return (
    <div className="w-sm h-100 bg-white/15 shadow">
    <form onSubmit={handleSubmit} className="p-10 rounded w-80 mx-auto">
      <h2 className="text-2xl text-white/45 text-center font-bold mb-10">
        Login
      </h2>
      <input
        name="email"
        className="border border-white/15 focus:outline-none p-2 w-full mt-6 mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        className="border border-white/15 focus:outline-none p-2 w-full mb-4"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 text-white w-full py-2 mt-6"
        type="submit"
      >
        Login
      </button>
    </form>
    </div>
  );
}
