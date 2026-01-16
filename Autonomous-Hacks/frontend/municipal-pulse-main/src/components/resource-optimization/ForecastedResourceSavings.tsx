import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastData, TimeHorizon } from "@/data/resourceOptimizationData";
import { Truck, Users, IndianRupee, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const timePoints = [
  { value: 'today' as TimeHorizon, label: 'Today' },
  { value: '7days' as TimeHorizon, label: '+7 days' },
  { value: '30days' as TimeHorizon, label: '+30 days' },
  { value: '90days' as TimeHorizon, label: '+90 days' },
];

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}

export function ForecastedResourceSavings() {
  const [selectedHorizon, setSelectedHorizon] = useState<TimeHorizon>('today');
  const data = forecastData[selectedHorizon];

  const currentIndex = timePoints.findIndex(t => t.value === selectedHorizon);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Forecasted Resource Savings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Slider */}
        <div className="relative">
          <div className="flex justify-between relative z-10">
            {timePoints.map((point, index) => (
              <button
                key={point.value}
                onClick={() => setSelectedHorizon(point.value)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  selectedHorizon === point.value ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-colors",
                  selectedHorizon === point.value 
                    ? "bg-primary border-primary" 
                    : index <= currentIndex
                    ? "bg-primary/50 border-primary/50"
                    : "bg-muted border-border"
                )} />
                <span className="text-xs font-medium">{point.label}</span>
              </button>
            ))}
          </div>
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-border -z-0">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${(currentIndex / (timePoints.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Forecast Data */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Trucks Required</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-foreground">{data.trucksRequired}</span>
              <span className="text-xs text-muted-foreground">vs {data.trucksBaseline} baseline</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Workers Required</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-foreground">{data.workersRequired}</span>
              <span className="text-xs text-muted-foreground">vs {data.workersBaseline} baseline</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Expected Cost</span>
            </div>
            <p className="text-xl font-bold text-foreground">{formatCurrency(data.expectedCost)}</p>
          </div>

          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Predicted Savings</span>
            </div>
            <p className="text-xl font-bold text-success">{formatCurrency(data.predictedSavings)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
