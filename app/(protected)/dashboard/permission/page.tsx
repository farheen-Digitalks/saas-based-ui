"use client";

import {
  deletePermission,
  getPermissions,
  type Permission,
} from "@/app/services/permission";
import { useEffect, useState } from "react";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPermissions();
        setPermissions(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load permissions";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this permission?")) return;
    try {
      await deletePermission(id);
      setPermissions((prev) => prev.filter((p) => p._id !== id));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete permission";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  if (loading) {
    return <p className="p-4 text-sm text-gray-500">Loading permissions…</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Permissions ({permissions.length})
        </h1>

        {/* Placeholder button – wire to a modal or form page */}
        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700">
          + Add Permission
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Create</th>
              <th className="px-4 py-3">Read</th>
              <th className="px-4 py-3">Update</th>
              <th className="px-4 py-3">Delete</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={perm._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{perm.name}</td>
                <td className="px-4 py-2">{perm.module}</td>
                <td className="px-4 py-2">{perm.action.create ? "✅" : "—"}</td>
                <td className="px-4 py-2">{perm.action.read ? "✅" : "—"}</td>
                <td className="px-4 py-2">{perm.action.update ? "✅" : "—"}</td>
                <td className="px-4 py-2">{perm.action.delete ? "✅" : "—"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 text-xs hover:underline">
                    Edit
                  </button>
                  <button
                    className="text-red-600 text-xs hover:underline"
                    onClick={() => handleDelete(perm._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {permissions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No permissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
