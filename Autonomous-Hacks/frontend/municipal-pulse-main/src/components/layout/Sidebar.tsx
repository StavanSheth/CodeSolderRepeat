import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Command,
  Brain,
  IndianRupee,
  Handshake,
  CalendarClock,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { name: "City Command Centre", href: "/command-centre", icon: Command, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { name: "Waste Intelligence", href: "/waste-intelligence", icon: Brain, color: "text-green-500", bgColor: "bg-green-500/10" },
  { name: "City Forecasting", href: "/forecasting", icon: CalendarClock, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { name: "Corporate Partnerships", href: "/corporate-partnerships", icon: Leaf, color: "text-teal-500", bgColor: "bg-teal-500/10" },
  { name: "Dustbin Tracking", href: "/dustbin-tracking", icon: IndianRupee, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { name: "Dustbin Analysis", href: "/dustbin-analysis", icon: Brain, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { name: "PPP & Contractors", href: "/contractors", icon: Handshake, color: "text-pink-500", bgColor: "bg-pink-500/10" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-950 flex-shrink-0 flex flex-col border-r border-slate-800 shadow-xl z-50 transition-all duration-300">
      {/* Logo/Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <img
            src="/sidebar_logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-xl shadow-lg ring-2 ring-white/10 object-cover"
          />
          <div>
            <span className="text-white font-bold text-lg tracking-tight block">Sankalp AI</span>
            <span className="text-xs text-slate-400 font-medium">Municipal Pulse</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</p>
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out relative overflow-hidden",
                    isActive
                      ? "bg-slate-800 text-white shadow-md translate-x-1"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white hover:translate-x-1"
                  )}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-lg bg-current", item.color.replace('text-', 'bg-'))} />
                  )}

                  {/* Icon with glow effect on active */}
                  <div className={cn(
                    "p-2 rounded-lg transition-colors duration-200",
                    isActive ? item.bgColor : "bg-slate-800/50 group-hover:bg-slate-800"
                  )}>
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>

                  <span className="truncate tracking-wide">{item.name}</span>

                  {/* Subtle arrow on hover */}
                  <div className={cn(
                    "ml-auto opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0",
                    isActive && "opacity-100 translate-x-0"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", item.color.replace('text-', 'bg-'))} />
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">System Status</span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">v2.4.0 • Stable</p>
        </div>
      </div>
    </aside>
  );
}
