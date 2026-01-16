import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routeStats } from "@/data/resourceOptimizationData";
import { Route, TrendingDown, Fuel, MapPin } from "lucide-react";

export function RouteOptimizationPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Route & Trip Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Route className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Route Length</span>
            </div>
            <p className="text-xl font-bold text-foreground">{routeStats.avgRouteLength} km</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Reduction</span>
            </div>
            <p className="text-xl font-bold text-success">{routeStats.reductionPercent}%</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Trips Eliminated</span>
            </div>
            <p className="text-xl font-bold text-foreground">{routeStats.tripsEliminated}</p>
            <p className="text-xs text-muted-foreground">this week</p>
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Fuel className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Fuel Saved</span>
            </div>
            <p className="text-xl font-bold text-success">{routeStats.fuelSaved} L</p>
          </div>
        </div>

        {/* Before vs After Comparison */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Before vs After</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Baseline Route Length</span>
              <span className="font-medium text-foreground">{routeStats.baselineRouteLength} km</span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-muted-foreground/30 rounded-full"
                style={{ width: '100%' }}
              />
              <div 
                className="absolute left-0 top-0 h-full bg-success rounded-full"
                style={{ width: `${(routeStats.avgRouteLength / routeStats.baselineRouteLength) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Optimized Route Length</span>
              <span className="font-medium text-success">{routeStats.avgRouteLength} km</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
