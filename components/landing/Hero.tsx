"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="/" className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block mb-4 rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
              Modern HRMS SaaS
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Smart HR Management <br />
              <span className="text-blue-500">for Growing Teams</span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-xl">
              Manage employees, payroll, attendance and compliance — all in one
              powerful, easy-to-use HRMS platform.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#request-trial"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
              >
                Request Free Trial
              </Link>

              <Link
                href="/auth/login"
                className="rounded-lg border border-gray-700 px-6 py-3 text-gray-300 hover:bg-white/5 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="relative">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-xl">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-400">
                Dashboard Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
