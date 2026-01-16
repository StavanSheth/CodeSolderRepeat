import { Truck, Users, Fuel, IndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScorecardItem {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
  trendPositive: boolean;
}

const scorecardItems: ScorecardItem[] = [
  {
    label: "Trucks Deployed",
    value: "18 / 25",
    subtext: "available",
    icon: <Truck className="h-5 w-5" />,
    trend: 'down',
    trendValue: "3 vs last week",
    trendPositive: true,
  },
  {
    label: "Workers Active",
    value: "124 / 160",
    subtext: "capacity",
    icon: <Users className="h-5 w-5" />,
    trend: 'down',
    trendValue: "8 vs last week",
    trendPositive: true,
  },
  {
    label: "Fuel Used Today",
    value: "1,240",
    subtext: "liters",
    icon: <Fuel className="h-5 w-5" />,
    trend: 'down',
    trendValue: "12% vs baseline",
    trendPositive: true,
  },
  {
    label: "Cost Saved (MTD)",
    value: "₹3.4L",
    subtext: "vs last quarter",
    icon: <IndianRupee className="h-5 w-5" />,
    trend: 'up',
    trendValue: "18% improvement",
    trendPositive: true,
  },
];

export function ResourceEfficiencyScorecard() {
  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border py-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {scorecardItems.map((item) => (
          <div
            key={item.label}
            className="bg-card border border-border rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">{item.icon}</span>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                item.trendPositive ? "text-success" : "text-critical"
              )}>
                {item.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{item.trendValue}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {item.label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">{item.value}</span>
              <span className="text-sm text-muted-foreground">{item.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
