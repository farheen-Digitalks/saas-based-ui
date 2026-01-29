"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          YourHRMS
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-gray-900">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-gray-900">
            Pricing
          </Link>
          <Link href="#contact" className="hover:text-gray-900">
            Contact
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>

          <Link
            href="/request-trial"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Request Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
