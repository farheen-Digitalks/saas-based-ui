"use client";

import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/StatCard";
import { getUserFromLocalStorage } from "@/utils/getAuthUser";
import { Stats } from "@/app/lib/Stats";

const mockMonthlyData = [
	{ month: "Jan", employees: 100, projects: 8 },
	{ month: "Feb", employees: 105, projects: 9 },
	{ month: "Mar", employees: 110, projects: 11 },
	{ month: "Apr", employees: 115, projects: 12 },
	{ month: "May", employees: 118, projects: 13 },
	{ month: "Jun", employees: 120, projects: 14 },
];

export default function AdminDashboardPage() {
	const user = getUserFromLocalStorage();

	return (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title={Stats.TITLE.TOTAL_EMPLOYEES}
          value={Stats.VALUES.TOTAL_EMPLOYEES}
          icon={Stats.ICONS.TOTAL_EMPLOYEES}
        />
        <StatCard
          title={Stats.TITLE.DEPARTMENTS}
          value={Stats.VALUES.DEPARTMENTS}
          icon={Stats.ICONS.DEPARTMENTS}
        />
        <StatCard
          title={Stats.TITLE.ACTIVE_PROJECTS}
          value={Stats.VALUES.ACTIVE_PROJECTS}
          icon={Stats.ICONS.ACTIVE_PROJECTS}
        />
        <StatCard
          title={Stats.TITLE.PENDING_APPROVALS}
          value={Stats.VALUES.PENDING_APPROVALS}
          icon={Stats.ICONS.PENDING_APPROVALS}
        />
      </div>

      {/* Analytics graph */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-600 font-medium">
            Analytics Overview
          </h2>
          <select className="border border-gray-300 rounded-md text-sm text-gray-600 px-2 py-1">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
          </select>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Employee and project growth over time.
        </div>

        {/* Very simple inline chart – placeholder for real chart lib */}
        <div className="w-full h-56 bg-gray-50 rounded-lg flex items-end px-4 gap-4">
          {mockMonthlyData.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center">
              {/* fixed bar area */}
              <div className="h-40 flex items-end gap-1 w-full justify-center">
                <div
                  className="w-4 rounded-t bg-blue-500"
                  style={{ height: `${item.employees}px` }} // or scale as needed
                  title={`Employees: ${item.employees}`}
                />
                <div
                  className="w-4 rounded-t bg-emerald-500"
                  style={{ height: `${item.projects * 8}px` }}
                  title={`Projects: ${item.projects}`}
                />
              </div>
              <span className="mt-2 text-xs text-gray-500">{item.month}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />
            Employees
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" />
            Projects
          </div>
        </div>
      </div>

      {/* Admin Quick Info */}
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

      {/* Admin actions */}
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
