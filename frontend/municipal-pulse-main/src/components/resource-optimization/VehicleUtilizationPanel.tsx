import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fleetData, fleetInsights } from "@/data/resourceOptimizationData";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function VehicleUtilizationPanel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Idle': return 'bg-warning/10 text-warning border-warning/20';
      case 'Maintenance': return 'bg-muted text-muted-foreground border-border';
      default: return '';
    }
  };

  const getLoadColor = (load: number) => {
    if (load >= 80) return 'text-success';
    if (load >= 50) return 'text-warning';
    return 'text-critical';
  };

  const getIdleColor = (idle: number) => {
    if (idle <= 10) return 'text-success';
    if (idle <= 25) return 'text-warning';
    return 'text-critical';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Fleet Utilization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Vehicle ID</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Trips</TableHead>
                <TableHead className="text-xs text-right">Avg Load</TableHead>
                <TableHead className="text-xs text-right">Idle Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fleetData.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-mono text-sm">{vehicle.id}</TableCell>
                  <TableCell className="text-sm">{vehicle.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(vehicle.status))}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">{vehicle.tripsToday}</TableCell>
                  <TableCell className={cn("text-right text-sm font-medium", getLoadColor(vehicle.avgLoad))}>
                    {vehicle.avgLoad}%
                  </TableCell>
                  <TableCell className={cn("text-right text-sm font-medium", getIdleColor(vehicle.idleTime))}>
                    {vehicle.idleTime}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-muted/50 rounded-md p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Lightbulb className="h-4 w-4 text-info" />
            <span>AI Insights</span>
          </div>
          <ul className="space-y-1">
            {fleetInsights.map((insight, index) => (
              <li key={index} className="text-sm text-muted-foreground pl-6">
                • {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
