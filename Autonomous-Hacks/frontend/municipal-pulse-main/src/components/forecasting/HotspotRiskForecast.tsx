import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskZone, TimeHorizon } from "@/data/forecastData";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface HotspotRiskForecastProps {
  risks: RiskZone[];
  timeHorizon: TimeHorizon;
}

const riskConfig = {
  low: { 
    color: 'bg-green-500', 
    bgColor: 'bg-green-50', 
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    icon: CheckCircle,
    label: 'Low Risk'
  },
  medium: { 
    color: 'bg-amber-500', 
    bgColor: 'bg-amber-50', 
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    icon: AlertCircle,
    label: 'Medium Risk'
  },
  high: { 
    color: 'bg-red-500', 
    bgColor: 'bg-red-50', 
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    icon: AlertTriangle,
    label: 'High Risk'
  },
};

export function HotspotRiskForecast({ risks, timeHorizon }: HotspotRiskForecastProps) {
  const highRiskCount = risks.filter(r => r.riskLevel === 'high').length;
  const mediumRiskCount = risks.filter(r => r.riskLevel === 'medium').length;
  const totalOverflowBins = risks.reduce((sum, r) => sum + r.overflowBins, 0);
  const totalDegradedStreets = risks.reduce((sum, r) => sum + r.degradedStreets, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Hotspot & Risk Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-800">{highRiskCount}</div>
            <div className="text-xs text-red-700">High Risk Zones</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-800">{mediumRiskCount}</div>
            <div className="text-xs text-amber-700">Medium Risk Zones</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground">{totalOverflowBins}</div>
            <div className="text-xs text-muted-foreground">Bins Likely to Overflow</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground">{totalDegradedStreets}</div>
            <div className="text-xs text-muted-foreground">Streets to Degrade</div>
          </div>
        </div>

        {/* City Map */}
        <div className="relative bg-slate-100 rounded-lg h-48 overflow-hidden">
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <pattern id="forecast-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#forecast-grid)" />
          </svg>

          {/* Risk zones */}
          {risks.map(zone => {
            const config = riskConfig[zone.riskLevel];
            return (
              <div
                key={zone.id}
                className="absolute flex flex-col items-center"
                style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                  config.bgColor,
                  config.borderColor,
                  "border"
                )}>
                  <config.icon className={cn("w-4 h-4", config.textColor)} />
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-1 bg-white/80 px-1 rounded">
                  {zone.name}
                </span>
              </div>
            );
          })}

          {/* City label */}
          <div className="absolute bottom-2 left-2 text-xs text-slate-500 font-medium">
            Indore City
          </div>
        </div>

        {/* Zone Details */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Zone Details</h4>
          {risks.map(zone => {
            const config = riskConfig[zone.riskLevel];
            return (
              <div 
                key={zone.id} 
                className={cn("flex items-center justify-between p-2 rounded-lg border", config.bgColor, config.borderColor)}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", config.color)} />
                  <span className={cn("text-sm font-medium", config.textColor)}>{zone.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className={config.textColor}>{zone.overflowBins} bins</span>
                  <span className={config.textColor}>{zone.degradedStreets} streets</span>
                  <span className={cn("font-medium px-1.5 py-0.5 rounded", config.color, "text-white text-[10px]")}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
