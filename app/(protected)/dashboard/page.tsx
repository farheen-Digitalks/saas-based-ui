"use client";

import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/StatCard";
import { getUserFromLocalStorage } from "@/utils/getAuthUser";

export default function DashboardPage() {
  const { user } = getUserFromLocalStorage();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome, {user?.name} 👋</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Employees" value="120" />
        <StatCard title="Departments" value="8" />
        <StatCard title="Active Projects" value="14" />
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-medium mb-4">Quick Info</h2>
        <p className="text-gray-600">
          Role: <b>{user?.role}</b>
        </p>
        <p className="text-gray-600">
          Permissions: {user?.permissions?.join(", ")}
        </p>
      </div>
    </div>
  );
}
