import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample incident data for heatmap
const incidentData = [
  { lat: 23.0225, lng: 72.5714, intensity: 8, type: "High Waste Volume", ward: "Ward 1" },
  { lat: 23.0325, lng: 72.5814, intensity: 6, type: "Medium Waste Volume", ward: "Ward 2" },
  { lat: 23.0125, lng: 72.5614, intensity: 9, type: "Critical Waste Volume", ward: "Ward 3" },
  { lat: 23.0425, lng: 72.5914, intensity: 4, type: "Low Waste Volume", ward: "Ward 4" },
  { lat: 23.0525, lng: 72.6014, intensity: 7, type: "High Waste Volume", ward: "Ward 5" },
  { lat: 23.0025, lng: 72.5514, intensity: 5, type: "Medium Waste Volume", ward: "Ward 6" },
  { lat: 23.0625, lng: 72.6114, intensity: 3, type: "Low Waste Volume", ward: "Ward 7" },
  { lat: 23.0725, lng: 72.6214, intensity: 8, type: "High Waste Volume", ward: "Ward 8" },
  { lat: 22.9925, lng: 72.5414, intensity: 6, type: "Medium Waste Volume", ward: "Ward 9" },
  { lat: 22.9825, lng: 72.5314, intensity: 9, type: "Critical Waste Volume", ward: "Ward 10" },
];

export function IncidentHeatmap() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize map
    const map = L.map("incident-heatmap").setView([23.0225, 72.5714], 12);
    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add incident markers with gradient effect for better visualization
    incidentData.forEach((incident, index) => {
      const color = getColorByIntensity(incident.intensity);
      const radius = getRadiusByIntensity(incident.intensity);

      // Create custom SVG icon with gradient for each marker
      const svgIcon = L.divIcon({
        className: 'custom-gradient-marker',
        html: `
          <div style="position: relative; width: ${radius * 2}px; height: ${radius * 2}px;">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: radial-gradient(circle at 30% 30%, ${color}40, ${color}99, ${color}ff);
              box-shadow: 0 0 ${radius}px ${color}80, 0 0 ${radius * 2}px ${color}40;
              animation: pulse-${index} 2s ease-in-out infinite;
            "></div>
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: ${radius}px;
              height: ${radius}px;
              border-radius: 50%;
              background: ${color};
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          </div>
          <style>
            @keyframes pulse-${index} {
              0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
            }
          </style>
        `,
        iconSize: [radius * 2, radius * 2],
        iconAnchor: [radius, radius],
      });

      // Create marker with custom icon
      const marker = L.marker([incident.lat, incident.lng], {
        icon: svgIcon,
      }).addTo(map);

      // Add popup with incident details
      marker.bindPopup(`
        <div style="font-size: 12px; min-width: 180px;">
          <div style="
            background: linear-gradient(135deg, ${color}20, ${color}10);
            padding: 8px;
            border-radius: 6px;
            margin-bottom: 8px;
            border-left: 3px solid ${color};
          ">
            <strong style="font-size: 14px;">${incident.ward}</strong>
          </div>
          <div style="padding: 4px 0;">
            <span style="
              display: inline-block;
              padding: 2px 8px;
              background: ${color}20;
              color: ${color};
              border-radius: 4px;
              font-weight: 600;
              font-size: 11px;
            ">${incident.type}</span>
          </div>
          <div style="margin-top: 8px; font-size: 11px; color: #666;">
            <strong>Intensity:</strong> 
            <span style="
              display: inline-block;
              padding: 1px 6px;
              background: ${color};
              color: white;
              border-radius: 3px;
              margin-left: 4px;
            ">${incident.intensity}/10</span>
          </div>
          <div style="margin-top: 4px; font-size: 10px; color: #888;">
            📍 ${incident.lat.toFixed(4)}, ${incident.lng.toFixed(4)}
          </div>
        </div>
      `);
    });

    // Add modern legend with gradient styling
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.cssText = `
        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
        padding: 12px 14px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.8);
      `;
      
      div.innerHTML = `
        <div style="font-size: 12px;">
          <strong style="font-size: 13px; display: block; margin-bottom: 10px;">Waste Volume Intensity</strong>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #dc262640, #dc262699, #dc2626ff);
                box-shadow: 0 0 8px #dc262680;
              "></div>
              <span>Critical (9-10)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #ea580c40, #ea580c99, #ea580cff);
                box-shadow: 0 0 8px #ea580c80;
              "></div>
              <span>High (7-8)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #f59e0b40, #f59e0b99, #f59e0bff);
                box-shadow: 0 0 8px #f59e0b80;
              "></div>
              <span>Medium (5-6)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #22c55e40, #22c55e99, #22c55eff);
                box-shadow: 0 0 8px #22c55e80;
              "></div>
              <span>Low (3-4)</span>
            </div>
          </div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const getColorByIntensity = (intensity: number): string => {
    if (intensity >= 9) return "#dc2626"; // Red - Critical
    if (intensity >= 7) return "#ea580c"; // Orange - High
    if (intensity >= 5) return "#f59e0b"; // Amber - Medium
    return "#22c55e"; // Green - Low
  };

  const getRadiusByIntensity = (intensity: number): number => {
    return 5 + (intensity * 1.2); // Radius from 8.6 to 16.8
  };

  return (
    <div className="w-full h-full">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">🗺️ Waste Volume Heatmap</h3>
        <p className="text-xs text-muted-foreground">Real-time incident density across city wards</p>
      </div>
      <div 
        id="incident-heatmap" 
        style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden" }}
      />
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div className="relative overflow-hidden rounded-lg p-3 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 opacity-10 rounded-full -mr-8 -mt-8"></div>
          <strong className="text-red-900 text-sm block mb-1">🔴 Max Volume</strong>
          <p className="text-red-700 font-medium">Ward 3, Ward 10</p>
          <p className="text-red-600 text-[10px] mt-1">Intensity: 9/10</p>
        </div>
        <div className="relative overflow-hidden rounded-lg p-3 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-10 rounded-full -mr-8 -mt-8"></div>
          <strong className="text-green-900 text-sm block mb-1">🟢 Min Volume</strong>
          <p className="text-green-700 font-medium">Ward 7</p>
          <p className="text-green-600 text-[10px] mt-1">Intensity: 3/10</p>
        </div>
      </div>
    </div>
  );
}
