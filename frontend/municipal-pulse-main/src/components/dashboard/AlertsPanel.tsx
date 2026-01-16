import { AlertTriangle, Clock, TrendingDown, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  time: string;
  icon: typeof AlertTriangle;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Landfill Capacity Alert",
    description: "Site B at 92% capacity. Diversion needed.",
    time: "10 min ago",
    icon: AlertTriangle,
  },
  {
    id: "2",
    type: "warning",
    title: "Collection Delay",
    description: "Ward 9 route delayed by 2 hours.",
    time: "25 min ago",
    icon: Truck,
  },
  {
    id: "3",
    type: "warning",
    title: "Revenue Drop",
    description: "Plastic waste revenue down 15% this week.",
    time: "1 hour ago",
    icon: TrendingDown,
  },
  {
    id: "4",
    type: "info",
    title: "SLA Review Due",
    description: "GreenCycle contractor review pending.",
    time: "2 hours ago",
    icon: Clock,
  },
];

const typeStyles = {
  critical: "border-l-critical bg-critical-muted",
  warning: "border-l-warning bg-warning-muted",
  info: "border-l-info bg-info-muted",
};

const iconStyles = {
  critical: "text-critical",
  warning: "text-warning",
  info: "text-info",
};

export function AlertsPanel() {
  return (
    <div className="bg-card rounded-md border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Active Alerts</h3>
        <span className="text-xs text-muted-foreground">4 unresolved</span>
      </div>
      
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 rounded border-l-4 border border-border",
              typeStyles[alert.type]
            )}
          >
            <div className="flex items-start gap-3">
              <alert.icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", iconStyles[alert.type])} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-3 py-2 text-xs font-medium text-info hover:underline">
        View All Alerts →
      </button>
    </div>
  );
}
