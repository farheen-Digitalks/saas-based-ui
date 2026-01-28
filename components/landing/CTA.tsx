"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section id="pricing" className="bg-blue-600 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to simplify your HR operations?
        </h2>

        <p className="mt-4 text-blue-100 text-lg">
          Join growing companies using YourHR to manage employees, payroll and
          compliance — all in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/request-trial"
            className="rounded-lg bg-white px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Request Free Trial
          </Link>

          <Link
            href="/plans"
            className="rounded-lg border border-white/30 px-6 py-3 font-medium hover:bg-white/10 transition"
          >
            See plans
          </Link>
        </div>
      </div>
    </section>
  );
}
