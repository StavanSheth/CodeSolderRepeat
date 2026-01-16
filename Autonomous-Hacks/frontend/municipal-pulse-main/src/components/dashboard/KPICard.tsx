import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  status?: "success" | "warning" | "critical" | "info" | "neutral";
}

export function KPICard({ label, value, unit, trend, status = "neutral" }: KPICardProps) {
  const statusColors = {
    success: "border-l-success",
    warning: "border-l-warning",
    critical: "border-l-critical",
    info: "border-l-info",
    neutral: "border-l-border",
  };

  const trendColors = {
    up: "text-success",
    down: "text-critical",
    neutral: "text-muted-foreground",
  };

  const TrendIcon = trend?.direction === "up" 
    ? TrendingUp 
    : trend?.direction === "down" 
    ? TrendingDown 
    : Minus;

  return (
    <div className={cn(
      "bg-card rounded-md border border-border p-4 border-l-4",
      statusColors[status]
    )}>
      <p className="kpi-label mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="kpi-value text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", trendColors[trend.direction])}>
          <TrendIcon className="w-3 h-3" />
          <span>{Math.abs(trend.value)}% vs yesterday</span>
        </div>
      )}
    </div>
  );
}
