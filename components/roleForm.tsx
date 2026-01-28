"use client";

import { useState, FormEvent } from "react";
import { createRole, type Role } from "@/app/services/role";

type Props = {
  onCancel: () => void;
  onCreated: (role: Role) => void;
};

export default function AddRoleForm({ onCancel, onCreated }: Props) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState(""); // comma‑separated ids
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !permissions.trim()) {
      setError("Name and permissions are required");
      return;
    }

    // convert "id1,id2" -> ["id1","id2"]
    const permissionIds = permissions
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    setSubmitting(true);
    try {
      const role = await createRole({
        name: name.trim(),
        permissions: permissionIds,
        description: description.trim() || undefined,
        companyId: "YOUR_COMPANY_ID_HERE", // or take from auth/user context
        isActive,
      });
      onCreated(role);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create role";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4"
    >
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Employee, Manager"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Permissions (IDs, comma‑separated)
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          placeholder="permId1, permId2, ..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Active
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="text-gray-600">
            {isActive ? "Active" : "Inactive"}
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of what this role can do"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Save Role"}
        </button>
      </div>
    </form>
  );
}
