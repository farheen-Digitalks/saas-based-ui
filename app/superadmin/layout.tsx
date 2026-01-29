"use client";

import Sidebar from "@/components/superadmin/Sidebar";
import { useState } from "react";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        onCloseMobile={() => setIsMobileOpen(false)}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
