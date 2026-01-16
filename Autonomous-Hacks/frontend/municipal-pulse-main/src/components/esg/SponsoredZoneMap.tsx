import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sponsoredZones, SponsoredZone } from "@/data/esgData";
import { MapPin } from "lucide-react";

interface SponsoredZoneMapProps {
  onZoneSelect: (zone: SponsoredZone) => void;
  selectedZoneId?: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Platinum': return 'bg-slate-100 text-slate-800 border-slate-300';
    case 'Gold': return 'bg-amber-50 text-amber-800 border-amber-300';
    case 'Silver': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'Bronze': return 'bg-orange-50 text-orange-800 border-orange-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function SponsoredZoneMap({ onZoneSelect, selectedZoneId }: SponsoredZoneMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Sponsored Zone Map</CardTitle>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Active Sponsorship</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-slate-50 rounded-lg overflow-hidden border border-border/30">
          {/* Grid Background */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="esg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#esg-grid)" />
          </svg>

          {/* City Outline */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M20,15 Q35,10 50,12 Q70,8 80,18 Q88,30 85,50 Q90,70 78,82 Q60,92 45,88 Q25,95 15,78 Q8,60 12,40 Q10,25 20,15"
              fill="hsl(var(--muted))"
              fillOpacity="0.2"
              stroke="hsl(var(--border))"
              strokeWidth="0.3"
            />
          </svg>

          {/* Zone Markers */}
          {sponsoredZones.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            const isHovered = hoveredZone === zone.id;
            const improvement = zone.afterMetrics.cleanlinessScore - zone.beforeMetrics.cleanlinessScore;
            
            return (
              <button
                key={zone.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 focus:outline-none ${
                  isSelected || isHovered ? 'z-20 scale-110' : 'z-10'
                }`}
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`
                }}
                onClick={() => onZoneSelect(zone)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Marker */}
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-emerald-500 ring-4 ring-emerald-200' 
                    : isHovered 
                      ? 'bg-emerald-400 ring-2 ring-emerald-100' 
                      : 'bg-emerald-500/80'
                }`}>
                  <MapPin className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-emerald-600">+{improvement}</span>
                  </div>
                </div>

                {/* Tooltip */}
                {(isSelected || isHovered) && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border/50 p-3 text-left">
                    <p className="font-semibold text-sm text-foreground">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">{zone.ward}</p>
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Sponsor</span>
                        <span className="text-xs font-medium">{zone.sponsor.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Level</span>
                        <Badge variant="outline" className={`text-[10px] py-0 ${getLevelColor(zone.sponsor.sponsorshipLevel)}`}>
                          {zone.sponsor.sponsorshipLevel}
                        </Badge>
                      </div>
                    </div>
                    {isSelected && (
                      <p className="text-[10px] text-emerald-600 mt-2 font-medium">Click for detailed view →</p>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-white/95 rounded-lg px-3 py-2 border border-border/30 shadow-sm">
            <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Sponsorship Level</p>
            <div className="flex flex-wrap gap-1.5">
              {['Platinum', 'Gold', 'Silver', 'Bronze'].map((level) => (
                <Badge key={level} variant="outline" className={`text-[9px] py-0 ${getLevelColor(level)}`}>
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
