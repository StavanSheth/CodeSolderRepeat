import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastExplanation } from "@/data/forecastData";
import { Info, Database, TrendingUp, Cloud, Calendar, Users, Box } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  'Historical Waste Patterns': Database,
  'Recent Trends': TrendingUp,
  'Weather Effects': Cloud,
  'Events & Festivals': Calendar,
  'Population Movement': Users,
  'Capacity Limits': Box,
};

export function ForecastExplanationPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          How Forecasts Are Generated
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Predictions are based on analysis of multiple data sources to provide actionable insights:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {forecastExplanation.dataSources.map(source => {
            const Icon = iconMap[source.name] || Info;
            return (
              <div key={source.name} className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{source.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{source.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Forecast Confidence</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${forecastExplanation.confidenceLevel}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">{forecastExplanation.confidenceLevel}%</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Last Updated</span>
            <p className="text-sm font-medium text-foreground">{forecastExplanation.lastUpdated}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
