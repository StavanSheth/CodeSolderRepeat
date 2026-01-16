import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkforceFleetForecast as WorkforceData, TimeHorizon } from "@/data/forecastData";
import { Users, Truck, Clock, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkforceFleetForecastProps {
  data: WorkforceData;
  timeHorizon: TimeHorizon;
}

export function WorkforceFleetForecast({ data, timeHorizon }: WorkforceFleetForecastProps) {
  const metrics = [
    {
      icon: Users,
      label: 'Workers Required',
      value: data.workersRequired.toLocaleString(),
      delta: data.workersDelta,
      unit: 'personnel',
    },
    {
      icon: Truck,
      label: 'Vehicles Required',
      value: data.vehiclesRequired.toLocaleString(),
      delta: data.vehiclesDelta,
      unit: 'vehicles',
    },
    {
      icon: Clock,
      label: 'Overtime Expected',
      value: data.overtimeHours.toLocaleString(),
      delta: data.overtimeDelta,
      unit: 'hours',
    },
    {
      icon: Fuel,
      label: 'Fuel Requirement',
      value: data.fuelLiters.toLocaleString(),
      delta: data.fuelDelta,
      unit: 'liters',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Workforce & Fleet Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map(metric => (
            <div key={metric.label} className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="text-xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">{metric.unit}</span>
                {metric.delta !== 0 && timeHorizon !== 'today' && (
                  <span className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    metric.delta > 0 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                  )}>
                    {metric.delta > 0 ? '+' : ''}{metric.delta.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {timeHorizon !== 'today' && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="text-sm font-medium text-amber-800 mb-1">Resource Alert</h4>
            <p className="text-xs text-amber-700">
              {data.workersDelta > 100 
                ? `Significant workforce increase of ${data.workersDelta} workers needed. Consider hiring temporary staff or coordinating with other departments.`
                : data.workersDelta > 0
                ? `Additional ${data.workersDelta} workers may be required. Plan overtime schedules accordingly.`
                : 'Current workforce allocation appears sufficient for projected demand.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
