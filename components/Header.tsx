"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <span className="text-gray-600">
        Logged in as <b>{user?.name}</b>
      </span>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </header>
  );
}
