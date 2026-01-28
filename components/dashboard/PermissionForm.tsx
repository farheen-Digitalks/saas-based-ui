"use client";

import { useState, FormEvent } from "react";
import {
  createPermission,
  type PermissionAction,
  type Permission,
} from "@/app/services/permission";

type Props = {
  onCancel: () => void;
  onCreated: (perm: Permission) => void;
};

export default function AddPermissionForm({ onCancel, onCreated }: Props) {
  const [name, setName] = useState("");
  const [module, setModule] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [action, setAction] = useState<PermissionAction>({
    create: false,
    read: false,
    update: false,
    delete: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (key: keyof PermissionAction) =>
    setAction((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !module.trim()) {
      setError("Name, Module and Company are required");
      return;
    }

    setSubmitting(true);
    try {
      const perm = await createPermission({
        name: name.trim(),
        module: module.trim(),
        description: description.trim() || undefined,
        action,
      });
      onCreated(perm);
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err.message : "Failed to create permission";
      setError(error);
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
          placeholder="e.g. Employee Management"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Module
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={module}
          onChange={(e) => setModule(e.target.value)}
          placeholder="e.g. employees, projects, billing"
          required
        />
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="companyId (ObjectId)"
          required
        />
      </div> */}

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-1">Actions</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={action.create}
              onChange={() => handleToggle("create")}
            />
            <span className="text-gray-600">Create</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={action.read}
              onChange={() => handleToggle("read")}
            />
            <span className="text-gray-600">Read</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={action.update}
              onChange={() => handleToggle("update")}
            />
            <span className="text-gray-600">Update</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={action.delete}
              onChange={() => handleToggle("delete")}
            />
            <span className="text-gray-600">Delete</span>
          </label>
        </div>
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
          placeholder="Short description of what this permission controls"
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
          {submitting ? "Saving…" : "Save Permission"}
        </button>
      </div>
    </form>
  );
}
