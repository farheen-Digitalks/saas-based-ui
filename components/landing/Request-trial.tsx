"use client";

import { createTrialRequest } from "@/app/services/trialService/trial";
import { FormEvent, useState } from "react";

export default function RequestTrial() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company_name: "",
    company_email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ basic validation
    if (!form.name.trim() || !form.email.trim() || !form.company_name.trim()) {
      setError("Name, Email and Company are required");
      return;
    }

    setLoading(true);

    try {
      const trial = await createTrialRequest({
        name: form.name.trim(),
        email: form.email.trim(),
        company_name: form.company_name.trim(),
        company_email: form.company_email.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        company_name: "",
        company_email: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        {success ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600">
              🎉 Request Sent!
            </h2>
            <p className="mt-4 text-gray-600">
              Our team will contact you shortly for the trial setup.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900">
              Request Free Trial
            </h2>
            <p className="mt-2 text-gray-600">
              See how our HRMS can simplify your HR operations.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    name="company"
                    value={form.company_name}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Company Email Address
                  </label>
                  <input
                    name="company_email"
                    type="email"
                    value={form.company_email}
                    onChange={handleChange}
                    placeholder="acmecorp@company.co.in"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your team size or requirements"
                  className="mt-1 w-full rounded-lg border px-4 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Request Trial"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
