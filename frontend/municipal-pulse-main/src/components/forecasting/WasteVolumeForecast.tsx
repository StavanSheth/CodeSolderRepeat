import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WasteForecast, TimeHorizon } from "@/data/forecastData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface WasteVolumeForecastProps {
  data: WasteForecast;
  timeHorizon: TimeHorizon;
  baselineVolume: number;
}

const wasteTypes = [
  { key: 'organic', label: 'Organic', color: 'bg-green-600' },
  { key: 'plastic', label: 'Plastic', color: 'bg-orange-500' },
  { key: 'dryRecyclables', label: 'Dry Recyclables', color: 'bg-blue-500' },
  { key: 'hazardous', label: 'Hazardous', color: 'bg-red-600' },
] as const;

export function WasteVolumeForecast({ data, timeHorizon, baselineVolume }: WasteVolumeForecastProps) {
  const volumeChange = data.totalVolume - baselineVolume;
  const volumeChangePercent = ((volumeChange / baselineVolume) * 100).toFixed(1);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-amber-600" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-600" />;
      default: return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>Waste Volume Forecast</span>
          {timeHorizon !== 'today' && (
            <span className={cn(
              "text-sm font-normal px-2 py-0.5 rounded",
              volumeChange > 0 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
            )}>
              {volumeChange > 0 ? '+' : ''}{volumeChangePercent}% vs Today
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Volume */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">
            {data.totalVolume.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">tons/day</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {timeHorizon === 'today' ? 'Current daily volume' : 'Predicted daily volume'}
          </p>
        </div>

        {/* Waste Type Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">By Waste Type</h4>
          <div className="grid grid-cols-2 gap-3">
            {wasteTypes.map(type => {
              const value = data[type.key];
              const percentage = ((value / data.totalVolume) * 100).toFixed(0);
              return (
                <div key={type.key} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full", type.color)} />
                    <span className="text-xs text-muted-foreground">{type.label}</span>
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {value} <span className="text-xs font-normal text-muted-foreground">tons</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Zone Distribution</h4>
          <div className="space-y-2">
            {data.zoneDistribution.map(zone => (
              <div key={zone.zone} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  {getTrendIcon(zone.trend)}
                  <span className="text-sm text-foreground">{zone.zone}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{zone.volume} tons</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
