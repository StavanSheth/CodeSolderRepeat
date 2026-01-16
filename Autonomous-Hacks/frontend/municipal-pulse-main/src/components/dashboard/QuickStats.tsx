import { Recycle, Leaf, Factory, Users } from "lucide-react";

const stats = [
  {
    label: "Active Contractors",
    value: "12",
    icon: Users,
    subtext: "2 underperforming",
    subtextType: "warning" as const,
  },
  {
    label: "Processing Plants",
    value: "8",
    icon: Factory,
    subtext: "1 offline",
    subtextType: "critical" as const,
  },
  {
    label: "Recycling Rate",
    value: "67%",
    icon: Recycle,
    subtext: "+3% this month",
    subtextType: "success" as const,
  },
  {
    label: "Carbon Offset",
    value: "245",
    icon: Leaf,
    subtext: "tons CO₂ saved",
    subtextType: "neutral" as const,
  },
];

const subtextColors = {
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
  neutral: "text-muted-foreground",
};

export function QuickStats() {
  return (
    <div className="bg-card rounded-md border border-border p-4">
      <h3 className="section-title mb-4">Quick Stats</h3>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
            <p className={`text-xs font-medium ${subtextColors[stat.subtextType]}`}>
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
