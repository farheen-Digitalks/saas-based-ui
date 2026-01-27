"use client";

import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/StatCard";
import { getUserFromLocalStorage } from "@/utils/getAuthUser";

export default function AdminDashboardPage() {
  const user = getUserFromLocalStorage();

  return (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value="120" />
        <StatCard title="Departments" value="8" />
        <StatCard title="Active Projects" value="14" />
        <StatCard title="Pending Approvals" value="5" />
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-medium mb-4">Admin Quick Info</h2>

        <p className="text-gray-600">
          Role: <b>{user?.role ?? "N/A"}</b>
        </p>

        <p className="text-gray-600">
          Permissions:{" "}
          {user?.permissions?.length
            ? user.permissions.join(", ")
            : "No permissions configured"}
        </p>
      </div>

      {/* Example admin actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-medium mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border rounded-lg py-3 px-4 text-left hover:bg-gray-50">
            Manage Users
          </button>
          <button className="border rounded-lg py-3 px-4 text-left hover:bg-gray-50">
            Manage Departments
          </button>
          <button className="border rounded-lg py-3 px-4 text-left hover:bg-gray-50">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
