"use client";

import { getTrialRequests, Trial } from "@/app/services/trialService/trial";
import { useEffect, useState } from "react";

export default function Request() {
  const [requests, setRequest] = useState<Trial[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try{
        const trial = await getTrialRequests();
        setRequest(trial);
      }catch(err){
        setError(err instanceof Error ? err.message : "Failed to get trial data");
      }
    }
    load();
  }, []);

  const statusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Trial Requests</h2>
        <p className="text-sm text-gray-500">
          Manage companies requesting HRMS trial access
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Requested On</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b text-sm">
                <td className="py-3 font-medium text-gray-800">{req.name}</td>
                <td>{req.email}</td>
                <td>{req.company_name}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                      req.status,
                    )}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{req.createdAt}</td>
                <td className="text-right space-x-2">
                  {req.status === "pending" && (
                    <>
                      <button className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">
                        Approve
                      </button>
                      <button className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
