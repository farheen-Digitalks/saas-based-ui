"use client";

// import { registerUser } from "./actions";

export default function RegisterPage() {
  return (
    <form className="bg-white p-8 rounded shadow w-80">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        name="name"
        className="border p-2 w-full mb-3"
        placeholder="Name"
      />
      <input
        name="email"
        className="border p-2 w-full mb-3"
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
      />
      <button className="bg-green-600 text-white w-full py-2">Register</button>
    </form>
  );
}
