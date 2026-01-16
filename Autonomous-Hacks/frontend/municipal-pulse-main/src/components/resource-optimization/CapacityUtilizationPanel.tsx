import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { capacityData } from "@/data/resourceOptimizationData";
import { cn } from "@/lib/utils";
import { Factory, Recycle, Warehouse, Trash2 } from "lucide-react";

const icons = {
  'Compost Plant': Factory,
  'Recycling Facility': Recycle,
  'Transfer Station': Warehouse,
  'Landfill': Trash2,
};

export function CapacityUtilizationPanel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'text-success';
      case 'Near Capacity': return 'text-warning';
      case 'Risk': return 'text-critical';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = (load: number) => {
    if (load >= 85) return '[&>div]:bg-warning';
    if (load >= 95) return '[&>div]:bg-critical';
    return '[&>div]:bg-success';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Capacity & Asset Utilization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {capacityData.map((asset) => {
          const Icon = icons[asset.name as keyof typeof icons] || Factory;
          return (
            <div key={asset.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{asset.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{asset.load}%</span>
                  <span className={cn("text-xs font-medium", getStatusColor(asset.status))}>
                    {asset.status}
                  </span>
                </div>
              </div>
              <Progress 
                value={asset.load} 
                className={cn("h-2", getProgressColor(asset.load))}
              />
              <p className="text-xs text-muted-foreground pl-6">{asset.explanation}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
