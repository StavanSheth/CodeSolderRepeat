import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { healthIndicators } from "@/data/resourceOptimizationData";
import { cn } from "@/lib/utils";
import { Truck, Users, Factory } from "lucide-react";

type RiskLevel = 'Low' | 'Medium' | 'High';

const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case 'Low': return 'bg-success';
    case 'Medium': return 'bg-warning';
    case 'High': return 'bg-critical';
  }
};

const getRiskTextColor = (level: RiskLevel) => {
  switch (level) {
    case 'Low': return 'text-success';
    case 'Medium': return 'text-warning';
    case 'High': return 'text-critical';
  }
};

const indicators = [
  { 
    label: 'Fleet Stress', 
    value: healthIndicators.fleetStress,
    icon: Truck,
  },
  { 
    label: 'Workforce Fatigue Risk', 
    value: healthIndicators.workforceFatigue,
    icon: Users,
  },
  { 
    label: 'Capacity Saturation Risk', 
    value: healthIndicators.capacitySaturation,
    icon: Factory,
  },
];

export function ResourceHealthIndicators() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Resource Health Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.map((indicator) => (
            <div key={indicator.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <indicator.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{indicator.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", getRiskColor(indicator.value))} />
                <span className={cn("text-sm font-semibold", getRiskTextColor(indicator.value))}>
                  {indicator.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
