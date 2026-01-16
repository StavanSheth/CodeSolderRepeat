import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Command,
  Brain,
  IndianRupee,
  Handshake,
  Truck,
  Factory,
  CalendarClock,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "City Command Centre", href: "/command-centre", icon: Command },
  { name: "Waste Intelligence", href: "/waste-intelligence", icon: Brain },
  { name: "City Forecasting", href: "/forecasting", icon: CalendarClock },
  { name: "Corporate Partnerships", href: "/corporate-partnerships", icon: Leaf },
  { name: "Dustbin Tracking", href: "/dustbin-tracking", icon: IndianRupee },
  { name: "PPP & Contractors", href: "/contractors", icon: Handshake },

];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 bg-sidebar flex-shrink-0 flex flex-col border-r border-sidebar-border">
      {/* Logo/Brand */}
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">SA</span>
          </div>
          <span className="text-sidebar-foreground font-semibold text-sm">Sankalp AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60 text-center">
          v1.0.0 • Waste Monetization
        </p>
      </div>
    </aside>
  );
}
