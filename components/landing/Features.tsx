"use client";

import {
  Users,
  CalendarCheck,
  Wallet,
  ShieldCheck,
  BarChart3,
  Settings,
} from "lucide-react";

const features = [
  {
    title: "Employee Management",
    description:
      "Centralized employee profiles with roles, departments and documents.",
    icon: Users,
  },
  {
    title: "Attendance & Leave",
    description:
      "Track attendance, manage leaves and holidays with flexible policies.",
    icon: CalendarCheck,
  },
  {
    title: "Payroll Management",
    description:
      "Automated payroll calculation with salary structures and deductions.",
    icon: Wallet,
  },
  {
    title: "Compliance Ready",
    description:
      "PF, ESI, professional tax and statutory compliance made simple.",
    icon: ShieldCheck,
  },
  {
    title: "Reports & Insights",
    description:
      "Powerful HR reports and analytics to help you make better decisions.",
    icon: BarChart3,
  },
  {
    title: "Customizable HRMS",
    description:
      "Configure workflows, policies and access based on your organization.",
    icon: Settings,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-blue-600 font-medium">HRMS Features</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need to manage your workforce
          </h2>
          <p className="mt-4 text-gray-600">
            YourHR simplifies HR operations so you can focus on growing your
            business — not managing spreadsheets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
