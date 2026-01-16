import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { zoneAllocations, workforceInsights } from "@/data/resourceOptimizationData";
import { Lightbulb, Users, Clock, CheckCircle, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Total Workers Available", value: 160, icon: Users },
  { label: "Workers Deployed", value: 124, icon: CheckCircle },
  { label: "Overtime Hours Avoided", value: 86, icon: Clock },
  { label: "Avg Tasks per Worker", value: 8.4, icon: BarChart3 },
];

export function WorkforceOptimizationPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Workforce Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-muted/30 rounded-md p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Zone-wise Allocation */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Zone-wise Allocation</h4>
          <div className="space-y-3">
            {zoneAllocations.map((zone) => {
              const isUnderstaffed = zone.assigned < zone.required;
              const isOverstaffed = zone.assigned > zone.required;
              return (
                <div key={zone.zone} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{zone.zone}</span>
                    <span className={cn(
                      "font-medium",
                      isUnderstaffed ? "text-critical" : isOverstaffed ? "text-warning" : "text-success"
                    )}>
                      {zone.assigned} / {zone.required}
                    </span>
                  </div>
                  <Progress 
                    value={(zone.assigned / zone.required) * 100} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-muted/50 rounded-md p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Lightbulb className="h-4 w-4 text-info" />
            <span>AI Insights</span>
          </div>
          <ul className="space-y-1">
            {workforceInsights.map((insight, index) => (
              <li key={index} className="text-sm text-muted-foreground pl-6">
                • {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
