import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriorityPanelProps {
  priority: {
    level: "Low" | "Medium" | "High";
    reasons: string[];
  } | null;
}

export function PriorityPanel({ priority }: PriorityPanelProps) {
  if (!priority) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Priority & Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Priority assessment pending
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriorityConfig = (level: string) => {
    switch (level) {
      case "High":
        return {
          icon: AlertTriangle,
          color: "bg-critical/10 text-critical border-critical/30",
          label: "Immediate Action",
          iconColor: "text-critical"
        };
      case "Medium":
        return {
          icon: Clock,
          color: "bg-warning/10 text-warning border-warning/30",
          label: "Schedule",
          iconColor: "text-warning"
        };
      default:
        return {
          icon: CheckCircle,
          color: "bg-success/10 text-success border-success/30",
          label: "Monitor",
          iconColor: "text-success"
        };
    }
  };

  const config = getPriorityConfig(priority.level);
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Priority & Severity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg border",
            config.color
          )}>
            <Icon className={cn("w-5 h-5", config.iconColor)} />
            <div>
              <p className="font-semibold">{priority.level} Priority</p>
              <p className="text-xs opacity-80">{config.label}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Assessment Factors:</p>
          <ul className="space-y-1">
            {priority.reasons.map((reason, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
