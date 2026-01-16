import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfrastructureLoad, TimeHorizon } from "@/data/forecastData";
import { cn } from "@/lib/utils";
import { Factory, Recycle, Building2, Mountain } from "lucide-react";

interface InfrastructureLoadForecastProps {
  data: InfrastructureLoad[];
  timeHorizon: TimeHorizon;
}

const facilityIcons = {
  compost: Factory,
  recycling: Recycle,
  transfer: Building2,
  landfill: Mountain,
};

const riskColors = {
  low: { bg: 'bg-green-100', text: 'text-green-800', bar: 'bg-green-500' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-800', bar: 'bg-amber-500' },
  high: { bg: 'bg-red-100', text: 'text-red-800', bar: 'bg-red-500' },
};

export function InfrastructureLoadForecast({ data, timeHorizon }: InfrastructureLoadForecastProps) {
  const criticalFacilities = data.filter(f => f.riskLevel === 'high').length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>Infrastructure Load Forecast</span>
          {criticalFacilities > 0 && (
            <span className="text-sm font-normal bg-red-100 text-red-800 px-2 py-0.5 rounded">
              {criticalFacilities} Critical
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map(facility => {
          const Icon = facilityIcons[facility.type];
          const colors = riskColors[facility.riskLevel];
          const utilizationPercent = Math.min((facility.forecastedLoad / facility.capacity) * 100, 100);
          const isOverCapacity = facility.forecastedLoad > facility.capacity;

          return (
            <div key={facility.facility} className={cn("rounded-lg p-3 border", colors.bg, `border-${colors.text.replace('text-', '')}/20`)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", colors.text)} />
                  <div>
                    <h4 className={cn("text-sm font-medium", colors.text)}>{facility.facility}</h4>
                    <p className="text-[10px] text-muted-foreground capitalize">{facility.type} Facility</p>
                  </div>
                </div>
                <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", colors.bg, colors.text)}>
                  {facility.riskLevel.toUpperCase()}
                </span>
              </div>

              {/* Capacity bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className={colors.text}>
                    {timeHorizon === 'today' ? 'Current' : 'Forecasted'}: {facility.forecastedLoad} tons
                  </span>
                  <span className="text-muted-foreground">Capacity: {facility.capacity} tons</span>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all", colors.bar)}
                    style={{ width: `${utilizationPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className={colors.text}>
                  {utilizationPercent.toFixed(0)}% Utilization
                </span>
                {isOverCapacity && (
                  <span className="text-red-800 font-medium">
                    ⚠ Over capacity by {facility.forecastedLoad - facility.capacity} tons
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
