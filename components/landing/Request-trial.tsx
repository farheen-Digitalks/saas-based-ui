"use client";

import { useState } from "react";

export default function RequestTrial() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/trial-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Trial request submitted!");
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6">Request Free Trial</h2>

        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="input mt-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Company"
          className="input mt-4"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="input mt-4"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl">
          Submit
        </button>
      </form>
    </section>
  );
}
