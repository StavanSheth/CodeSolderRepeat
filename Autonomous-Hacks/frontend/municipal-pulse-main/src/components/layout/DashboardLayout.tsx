import { ReactNode } from "react";
import { TopNav } from "./TopNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <TopNav />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}
