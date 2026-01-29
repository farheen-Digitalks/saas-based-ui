import Sidebar from "@/components/superadmin/Sidebar";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isMobileOpen={false} isCollapsed={false} onCloseMobile={function (): void {
              throw new Error("Function not implemented.");
          } } onToggleCollapse={function (): void {
              throw new Error("Function not implemented.");
          } } />
      {children}
    </div>
  );
}
