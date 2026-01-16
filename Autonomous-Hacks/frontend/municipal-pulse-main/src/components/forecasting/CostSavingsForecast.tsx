import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostForecast, TimeHorizon } from "@/data/forecastData";
import { IndianRupee, TrendingDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostSavingsForecastProps {
  data: CostForecast;
  timeHorizon: TimeHorizon;
  baselineCost: number;
}

const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${(amount / 1000).toFixed(0)}K`;
};

export function CostSavingsForecast({ data, timeHorizon, baselineCost }: CostSavingsForecastProps) {
  const costIncrease = data.totalCost - baselineCost;
  const costIncreasePercent = ((costIncrease / baselineCost) * 100).toFixed(0);

  const costBreakdown = [
    { label: 'Cleaning Cost', value: data.cleaningCost, color: 'bg-blue-500' },
    { label: 'Transportation Cost', value: data.transportationCost, color: 'bg-amber-500' },
    { label: 'Processing Cost', value: data.processingCost, color: 'bg-green-500' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Cost & Savings Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Cost */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <IndianRupee className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {timeHorizon === 'today' ? 'Current Daily Cost' : 'Forecasted Daily Cost'}
            </span>
          </div>
          <div className="text-3xl font-bold text-foreground">
            {formatCurrency(data.totalCost)}
          </div>
          {timeHorizon !== 'today' && costIncrease > 0 && (
            <p className="text-sm text-amber-600 mt-1">
              +{costIncreasePercent}% increase from today
            </p>
          )}
        </div>

        {/* Cost Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Cost Breakdown</h4>
          <div className="space-y-2">
            {costBreakdown.map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>

          {/* Visual bar */}
          <div className="flex h-3 rounded-full overflow-hidden mt-3">
            {costBreakdown.map(item => (
              <div 
                key={item.label}
                className={cn(item.color)}
                style={{ width: `${(item.value / data.totalCost) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Savings & Losses */}
        {timeHorizon !== 'today' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700">Potential Savings</span>
              </div>
              <div className="text-xl font-bold text-green-800">{formatCurrency(data.potentialSavings)}</div>
              <p className="text-[10px] text-green-600 mt-1">With optimized planning</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-xs text-red-700">Avoidable Losses</span>
              </div>
              <div className="text-xl font-bold text-red-800">{formatCurrency(data.avoidableLosses)}</div>
              <p className="text-[10px] text-red-600 mt-1">If no action taken</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
