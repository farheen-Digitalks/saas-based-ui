"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
};

export default function Sidebar({
  isMobileOpen,
  isCollapsed,
  onCloseMobile,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const linkBase =
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors";
  const active = "bg-blue-50 text-blue-700 font-medium border border-blue-100";
  const inactive = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  const widthClass = isCollapsed ? "md:w-20" : "md:w-64";

  const navItemsMain = [{ href: "/dashboard", label: "Dashboard", icon: "📊" }];
  const navItemsManagement = [
    { href: "/dashboard/employees", label: "Employees", icon: "👥" },
    { href: "/dashboard/departments", label: "Departments", icon: "🏢" },
    { href: "/dashboard/projects", label: "Projects", icon: "📁" },
  ];
  const navItemsSettings = [
    { href: "/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
    { href: "/dashboard/permission", label: "Permission", icon: "🛡️" },
    { href: "/dashboard/role", label: "Role", icon: "👤" },
  ];

  const renderLink = (item: { href: string; label: string; icon: string }) => {
    const isActive =
      pathname === item.href || pathname.startsWith(item.href + "/");

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${linkBase} ${isActive ? active : inactive}`}
      >
        <span>{item.icon}</span>
        <span
          className={`
            ml-1 inline-block whitespace-nowrap
            transition-all duration-300
            ${
              isCollapsed
                ? "opacity-0 -translate-x-2 w-0"
                : "opacity-100 translate-x-0 w-auto"
            }
          `}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  const renderContent = () => (
    <div className="flex flex-col h-full">
      {/* Top: logo + collapse button */}
      <div className="mb-8 border-b pb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">🛠</span>
          <span
            className={`
              text-xl font-bold text-black
              transition-all duration-300
              ${
                isCollapsed
                  ? "opacity-0 -translate-x-2 w-0"
                  : "opacity-100 translate-x-0 w-auto"
              }
            `}
          >
            Admin Panel
          </span>
        </div>
        {/* Collapse toggle (desktop only) */}
        <button
          type="button"
          className="hidden md:inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? "➡" : "⬅"}
        </button>
      </div>

      <nav className="space-y-4 flex-1">
        {/* Main */}
        <div>
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
              Main
            </p>
          )}
          {navItemsMain.map(renderLink)}
        </div>

        {/* Management */}
        <div>
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
              Management
            </p>
          )}
          <ul className="space-y-1">
            {navItemsManagement.map((item) => (
              <li key={item.href}>{renderLink(item)}</li>
            ))}
          </ul>
        </div>

        {/* Settings */}
        <div>
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
              Settings
            </p>
          )}
          <ul className="space-y-1">
            {navItemsSettings.map((item) => (
              <li key={item.href}>{renderLink(item)}</li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-8 pt-4 border-t text-xs text-gray-400">
        {!isCollapsed && (
          <>
            <p>Logged in as</p>
            <p className="text-sm font-medium text-gray-700">Admin</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:block bg-white shadow-md p-4
          transition-all duration-300 ease-in-out overflow-hidden
          ${widthClass}
        `}
      >
        {renderContent()}
      </aside>

      {/* Mobile slide-over sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={onCloseMobile} />
          <aside className="relative w-64 bg-white shadow-md p-4 z-50 animate-slide-in">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={onCloseMobile}
            >
              ✕
            </button>
            {renderContent()}
          </aside>
        </div>
      )}
    </>
  );
}
