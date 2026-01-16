import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Incident } from "@/data/dummyIncidents";

interface IncidentMapPanelProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string) => void;
}

export function IncidentMapPanel({ incidents, selectedIncidentId, onSelectIncident }: IncidentMapPanelProps) {
  // Map bounds for display (simulating Indore city area)
  const mapBounds = {
    minLat: 22.65,
    maxLat: 22.78,
    minLng: 75.82,
    maxLng: 75.95
  };

  const getPositionOnMap = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-critical text-white border-critical";
      case "Medium": return "bg-warning text-white border-warning";
      default: return "bg-success text-white border-success";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Incident Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-muted/20 border-t overflow-hidden">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Simulated Road Network */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              {/* Main roads */}
              <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.3" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.3" />
              <line x1="20%" y1="60%" x2="80%" y2="60%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.2" />
              <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.2" />
              <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.2" />
            </svg>
          </div>

          {/* Map Labels */}
          <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
            Indore Municipal Area
          </div>

          {/* Incident Pins */}
          {incidents.map((incident: Incident) => {
            const priorityLevel = incident.priority.level;
            const pos = getPositionOnMap(incident.location.lat, incident.location.lng);
            const isSelected = selectedIncidentId === incident.id;
            
            return (
              <div
                key={incident.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => onSelectIncident(incident.id)}
              >
                <div className={cn(
                  "flex flex-col items-center",
                  isSelected && "scale-125"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2",
                    getPriorityColor(priorityLevel),
                    isSelected && "ring-2 ring-offset-2 ring-info"
                  )}>
                    <MapPin className="w-3 h-3" />
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-current" 
                       style={{ color: `hsl(var(--${priorityLevel === 'High' ? 'critical' : priorityLevel === 'Medium' ? 'warning' : 'success'}))` }} />
                </div>
                {isSelected && (
                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg z-10">
                    {incident.location.address.split(',')[0]}
                  </div>
                )}
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-background/90 border rounded p-2 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-critical" />
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Low Priority</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
