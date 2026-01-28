"use client";

import { useEffect, useState } from "react";
import { getRoles, deleteRole, type Role } from "@/app/services/role";
import AddRoleForm from "@/components/dashboard/roleForm";

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load roles";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreated = (r: Role) => {
    setRoles((prev) => [r, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this role?")) return;
    try {
      await deleteRole(id);
      setRoles((prev) => prev.filter((p) => p._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete role";
      setError(msg);
      alert(msg);
    }
  };

  if (loading) {
    return <p className="p-4 text-sm text-gray-500">Loading roles…</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4 p-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Roles ({roles.length})
        </h1>

        <button
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          + Add Role
        </button>
      </div>

      {showForm && (
        <AddRoleForm
          onCancel={() => setShowForm(false)}
          onCreated={handleCreated}
        />
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Permissions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r, index) => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">
                  {Array.isArray(r.permissions) && r.permissions.length > 0
                    ? `${r.permissions.length} permission(s)`
                    : "—"}
                </td>
                <td className="px-4 py-2">
                  {r.isActive ? (
                    <span className="text-green-600 text-xs font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs font-medium">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 text-xs hover:underline">
                    Edit
                  </button>
                  <button
                    className="text-red-600 text-xs hover:underline"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
