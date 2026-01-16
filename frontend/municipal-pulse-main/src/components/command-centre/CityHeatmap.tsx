import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AreaData, citySummary } from "@/data/areaData";
import { cn } from "@/lib/utils";
import { RefreshCw, AlertTriangle, Users, Truck, Info } from "lucide-react";

interface CityHeatmapProps {
  areas: AreaData[];
  selectedAreaId: string | null;
  onSelectArea: (id: string) => void;
}

// SVG Overlay component for heatmap gradients
function HeatmapOverlay({ areas, selectedAreaId, onSelectArea }: CityHeatmapProps) {
  const map = useMap();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!map || !svgRef.current) return;

    const svg = svgRef.current;
    
    // Clear existing SVG
    svg.innerHTML = '';

    // Create defs for gradients
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    // Create gradients for each area
    areas.forEach((area, idx) => {
      const severityWeight = {
        critical: 1.0,
        high: 0.8,
        medium: 0.55,
        low: 0.3,
        negligible: 0.12
      };
      
      const confidenceWeight = area.confidence === "high" ? 1.0 : area.confidence === "medium" ? 0.65 : 0.3;
      const intensity = severityWeight[area.severity] * confidenceWeight;

      // Determine color based on severity
      let color = "#3b82f6"; // Default blue
      if (area.severity === "critical") color = "#ef4444"; // Red
      else if (area.severity === "high") color = "#f97316"; // Orange
      else if (area.severity === "medium") color = "#eab308"; // Yellow
      else if (area.severity === "low") color = "#22c55e"; // Green

      // Create radial gradient
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
      gradient.id = `gradient-${idx}`;
      gradient.setAttribute("cx", "50%");
      gradient.setAttribute("cy", "50%");
      gradient.setAttribute("r", "50%");

      // Add color stops
      const stops = [
        { offset: "0%", opacity: intensity.toString() },
        { offset: "40%", opacity: (intensity * 0.7).toString() },
        { offset: "70%", opacity: (intensity * 0.3).toString() },
        { offset: "100%", opacity: "0" }
      ];

      stops.forEach(stop => {
        const stopEl = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stopEl.setAttribute("offset", stop.offset);
        stopEl.setAttribute("stop-color", color);
        stopEl.setAttribute("stop-opacity", stop.opacity);
        gradient.appendChild(stopEl);
      });

      defs.appendChild(gradient);
    });

    svg.appendChild(defs);

    // Draw circles for each area
    areas.forEach((area, idx) => {
      const point = map.latLngToLayerPoint(L.latLng(area.center.lat, area.center.lng));
      
      const baseRadius = {
        critical: 100,
        high: 80,
        medium: 60,
        low: 50,
        negligible: 40
      };
      
      const reportFactor = Math.min(area.reportCount / 30, 1.5);
      const radius = baseRadius[area.severity] * (0.7 + reportFactor * 0.5);

      // Draw circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point.x.toString());
      circle.setAttribute("cy", point.y.toString());
      circle.setAttribute("r", radius.toString());
      circle.setAttribute("fill", `url(#gradient-${idx})`);
      circle.setAttribute("class", "heatmap-circle cursor-pointer");
      circle.style.opacity = "0.9";
      
      // Add click handler
      circle.addEventListener("click", () => onSelectArea(area.id));
      circle.style.cursor = "pointer";
      
      svg.appendChild(circle);

      // Draw border for selected
      if (selectedAreaId === area.id) {
        const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        border.setAttribute("cx", point.x.toString());
        border.setAttribute("cy", point.y.toString());
        border.setAttribute("r", radius.toString());
        border.setAttribute("fill", "none");
        border.setAttribute("stroke", "white");
        border.setAttribute("stroke-width", "3");
        border.setAttribute("stroke-dasharray", "5,5");
        svg.appendChild(border);
      }
    });

  }, [areas, selectedAreaId, map]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 500,
        pointerEvents: 'auto'
      }}
    />
  );
}


export function CityHeatmap({ areas, selectedAreaId, onSelectArea }: CityHeatmapProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Summary Bar */}
      <div className="flex-shrink-0 border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last refresh: {citySummary.lastRefresh}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>{citySummary.criticalAreas} Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>{citySummary.highPriorityAreas} High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>{citySummary.mediumPriorityAreas} Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>{citySummary.lowPriorityAreas} Low</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span>{citySummary.totalReports} reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{citySummary.totalWorkersRequired.min}-{citySummary.totalWorkersRequired.max} workers needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span>{citySummary.vehiclesAvailable}/{citySummary.vehiclesDeployed + citySummary.vehiclesAvailable} vehicles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaflet Map Container */}
      <div className="flex-1 relative">
        <MapContainer 
          center={[22.72, 75.87]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Heatmap Overlay with Gradients */}
          <HeatmapOverlay areas={areas} selectedAreaId={selectedAreaId} onSelectArea={onSelectArea} />
        </MapContainer>

        {/* City label */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-700 shadow-lg z-20 pointer-events-none">
          <h3 className="text-sm font-semibold text-white">Indore City</h3>
          <p className="text-xs text-slate-400">Resource Allocation Heatmap</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-sm px-4 py-3 rounded-md border border-slate-700 shadow-lg z-20 pointer-events-none">
          <p className="text-xs font-medium mb-2 text-white">Priority Intensity</p>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-32 h-3 rounded-sm" style={{
              background: 'linear-gradient(to right, rgb(59, 130, 246), rgb(34, 211, 238), rgb(34, 197, 94), rgb(234, 179, 8), rgb(249, 115, 22), rgb(239, 68, 68))'
            }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 w-32">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Click instruction */}
        {!selectedAreaId && (
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-700 shadow-lg z-20 pointer-events-none">
            <p className="text-sm text-slate-300">Click zones on map</p>
          </div>
        )}
      </div>
    </div>
  );
}