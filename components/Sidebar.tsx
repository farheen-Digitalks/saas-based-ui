"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <div className="mb-8 border-b pb-4 items-center flex">
      <h2 className="text-xl text-black font-bold mb-6">Admin Panel</h2>
      </div>

      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="block text-blue-700 hover:text-black"
        >
          Dashboard
        </Link>
        <ul className="space-y-2 mt-4 pl-4 border-l border-gray-200 text-gray-600">
          <li>
            <Link href="/dashboard/employees">Employees</Link>
          </li>
          <li>
            <Link href="/dashboard/departments">Departments</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
