"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between">
      {/* Left: greeting */}
      <div>
        <h1 className="text-2xl text-gray-600 font-semibold">
          Hi {user?.name ? ` ${user.name}` : ""} 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back
        </p>
      </div>

      {/* Right: search + theme + profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-400 text-sm">
            🔍
          </span>
        </div>

        {/* Theme toggle (dummy handler now) */}
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-100"
          // onClick={toggleTheme}
        >
          🌙
        </button>

        {/* Profile + dropdown placeholder */}
        <div className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden sm:flex flex-col">
            {/* <span className="text-sm font-medium">{user?.name || "User"}</span> */}
            {/* <span className="text-xs text-gray-500">
              {user?.role || "Role"}
            </span> */}
          </div>
        </div>

        {/* Logout */}
        {/* <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button> */}
      </div>
    </header>
  );
}
