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

  return (
    <form className="bg-white p-8 rounded shadow w-80">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        name="email"
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 text-white w-full py-2"
        onClick={() => login({ email, password })}
      >
        Login
      </button>
    </form>
  );
}
