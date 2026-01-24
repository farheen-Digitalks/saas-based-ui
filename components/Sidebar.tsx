"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="block text-gray-700 hover:text-black"
        >
          Dashboard
        </Link>
        <Link href="/dashboard/employees">Employees</Link>
        <Link href="/dashboard/departments">Departments</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </nav>
    </aside>
  );
}
