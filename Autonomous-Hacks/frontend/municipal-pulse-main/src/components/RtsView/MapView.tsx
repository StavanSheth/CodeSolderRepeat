import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RTS_LOCATIONS } from "@/data/rts";
import { toast } from "sonner";

// Dustbin colors based on fill level
// Green: 0-25% (60kg), Yellow: 26-50% (60kg), Red: 51-75% (90kg), Dark Red: 76-100% (100kg)
const dustbinColors = {
  GREEN: "#22c55e",
  YELLOW: "#eab308",
  RED: "#ef4444",
  DARK_RED: "#991b1b"
};

const dustbinWeights = {
  GREEN: 60,
  YELLOW: 60,
  RED: 90,
  DARK_RED: 100
};

const TRUCK_CAPACITY = 1000; // kg
const TRUCK_SPEED = 4000; // ms per dustbin (slower for better visibility)

interface DustbinMarker {
  lat: number;
  lng: number;
  color: string;
  weight: number;
  label: string;
  marker: L.Marker;
  collected: boolean;
}

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const dustbinMarkersRef = useRef<Map<string, DustbinMarker[]>>(new Map());
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const findNearestRTS = (lat: number, lng: number) => {
    let nearest = RTS_LOCATIONS[0];
    let minDist = Infinity;
    
    RTS_LOCATIONS.forEach((rts) => {
      const dist = Math.sqrt(Math.pow(rts.lat - lat, 2) + Math.pow(rts.lng - lng, 2));
      if (dist < minDist) {
        minDist = dist;
        nearest = rts;
      }
    });
    
    return nearest;
  };

  const optimizeRoute = (dustbins: DustbinMarker[], startLat: number, startLng: number) => {
    // Simple nearest neighbor algorithm for TSP
    const unvisited = [...dustbins];
    const route: DustbinMarker[] = [];
    let current = { lat: startLat, lng: startLng };
    
    while (unvisited.length > 0) {
      let nearest = unvisited[0];
      let minDist = Infinity;
      
      unvisited.forEach((bin) => {
        const dist = Math.sqrt(Math.pow(bin.lat - current.lat, 2) + Math.pow(bin.lng - current.lng, 2));
        if (dist < minDist) {
          minDist = dist;
          nearest = bin;
        }
      });
      
      route.push(nearest);
      current = { lat: nearest.lat, lng: nearest.lng };
      unvisited.splice(unvisited.indexOf(nearest), 1);
    }
    
    return route;
  };

  const animateTruckCollection = async (wardName: string, wardCenter: L.LatLng, map: L.Map) => {
    const dustbins = dustbinMarkersRef.current.get(wardName);
    if (!dustbins || dustbins.length === 0) return;

    // Create truck marker
    const truckIcon = L.divIcon({
      className: "",
      html: `
        <div style="
          width: 28px;
          height: 28px;
          background: #0ea5e9;
          border: 3px solid white;
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        ">🚛</div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const truck = L.marker([wardCenter.lat, wardCenter.lng], { icon: truckIcon }).addTo(map);
    truckMarkerRef.current = truck;

    let currentWeight = 0;
    const availableBins = dustbins.filter(b => !b.collected);
    
    if (availableBins.length === 0) {
      toast.info("All bins already collected in this ward!");
      truck.remove();
      truckMarkerRef.current = null;
      return;
    }
    
    const route = optimizeRoute(availableBins, wardCenter.lat, wardCenter.lng);

    // Calculate total weight
    const totalWeight = route.reduce((sum, bin) => sum + bin.weight, 0);
    
    toast.info(`🚛 Truck dispatched to ${wardName}`, {
      description: `${route.length} bins | Total: ${totalWeight}kg`
    });

    // Draw route line with better visibility
    const routeCoords: [number, number][] = [[wardCenter.lat, wardCenter.lng]];
    route.forEach(bin => routeCoords.push([bin.lat, bin.lng]));
    
    // Add final destination (nearest RTS) to route
    const finalRTS = findNearestRTS(route[route.length - 1].lat, route[route.length - 1].lng);
    routeCoords.push([finalRTS.lat, finalRTS.lng]);
    
    const routeLine = L.polyline(routeCoords, {
      color: '#0ea5e9',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 5',
      className: 'truck-route-line'
    }).addTo(map);
    routeLineRef.current = routeLine;
    
    // Add arrow markers along route to show direction
    const decorator = L.polylineDecorator(routeLine, {
      patterns: [
        {
          offset: 25,
          repeat: 50,
          symbol: L.Symbol.arrowHead({
            pixelSize: 8,
            pathOptions: {
              fillOpacity: 1,
              weight: 0,
              color: '#0ea5e9'
            }
          })
        }
      ]
    });
    // Note: decorator requires leaflet-polylinedecorator plugin, skipping for now

    // Animate truck through route
    for (let i = 0; i < route.length; i++) {
      const bin = route[i];
      
      // Check if adding this bin would exceed capacity
      if (currentWeight + bin.weight > TRUCK_CAPACITY) {
        toast.warning(`⚠️ Truck at capacity: ${currentWeight}kg`, {
          description: `Returning to RTS before collecting more`
        });
        
        // Return to nearest RTS
        const nearestRTS = findNearestRTS(truck.getLatLng().lat, truck.getLatLng().lng);
        await animateTruckMovement(truck, truck.getLatLng().lat, truck.getLatLng().lng, nearestRTS.lat, nearestRTS.lng);
        
        toast.success(`✅ Delivered ${currentWeight}kg to ${nearestRTS.name}`, {
          description: `Truck emptied, continuing collection`
        });
        
        currentWeight = 0;
      }

      // Move truck to bin
      const currentPos = truck.getLatLng();
      await animateTruckMovement(truck, currentPos.lat, currentPos.lng, bin.lat, bin.lng);
      
      // Collect garbage
      const binWeight = bin.weight;
      currentWeight += binWeight;
      bin.collected = true;
      
      // Change bin to grey (collected)
      bin.marker.setIcon(L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;border-radius:50%;background:#9ca3af;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      }));
      
      toast.success(`📦 Collected ${binWeight}kg from bin ${i + 1}/${route.length}`, {
        description: `Current load: ${currentWeight}kg / ${TRUCK_CAPACITY}kg`
      });
      
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Return to nearest RTS with final load
    if (currentWeight > 0) {
      const finalRTS = findNearestRTS(truck.getLatLng().lat, truck.getLatLng().lng);
      await animateTruckMovement(truck, truck.getLatLng().lat, truck.getLatLng().lng, finalRTS.lat, finalRTS.lng);
      
      toast.success(`✅ Collection complete!`, {
        description: `Delivered final ${currentWeight}kg to ${finalRTS.name}`
      });
    }

    // Cleanup - keep route visible for longer
    setTimeout(() => {
      truck.remove();
      truckMarkerRef.current = null;
    }, 1000);
    
    // Remove route line after longer delay so user can see the path taken
    setTimeout(() => {
      routeLine.remove();
      routeLineRef.current = null;
    }, 5000);
  };

  const animateTruckMovement = (truck: L.Marker, fromLat: number, fromLng: number, toLat: number, toLng: number): Promise<void> => {
    return new Promise((resolve) => {
      const steps = 60;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const lat = fromLat + (toLat - fromLat) * progress;
        const lng = fromLng + (toLng - fromLng) * progress;
        
        truck.setLatLng([lat, lng]);
        
        if (currentStep >= steps) {
          clearInterval(interval);
          resolve();
        }
      }, TRUCK_SPEED / steps);
    });
  };

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize map
    const map = L.map("ward-map").setView([23.0225, 72.5714], 13);
    mapRef.current = map;

    // Base OSM tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Load Ward Boundaries
    fetch("/Wards.geojson")
      .then((res) => res.json())
      .then((wards) => {
        L.geoJSON(wards, {
          style: () => ({
            color: "#2563eb",
            weight: 2,
            opacity: 0.8,
            fillColor: "#3b82f6",
            fillOpacity: 0.15
          }),
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              const wardName = feature.properties.ward_name || feature.properties.WARD_NO || "Ward";
              layer.bindPopup(`<strong>${wardName}</strong><br/><small>Click to dispatch truck</small>`);
              
              const wardBins: DustbinMarker[] = [];
              
              // Add dustbins to each ward
              if (feature.geometry.type === "Polygon") {
                const bounds = (layer as L.Polygon).getBounds();
                const center = bounds.getCenter();
                
                // Create 4 dustbins per ward at random unsymmetric positions
                const dustbinTypes = [
                  { color: dustbinColors.GREEN, weight: dustbinWeights.GREEN, label: "Low Fill (0-25%)", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                  { color: dustbinColors.YELLOW, weight: dustbinWeights.YELLOW, label: "Medium Fill (26-50%)", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                  { color: dustbinColors.RED, weight: dustbinWeights.RED, label: "High Fill (51-75%)", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                  { color: dustbinColors.DARK_RED, weight: dustbinWeights.DARK_RED, label: "Critical Fill (76-100%)", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] }
                ];
                
                dustbinTypes.forEach((bin) => {
                  const lat = center.lat + bin.offset[0];
                  const lng = center.lng + bin.offset[1];
                  
                  const marker = L.marker([lat, lng], {
                    icon: L.divIcon({
                      className: "",
                      html: `<div style="width:16px;height:16px;border-radius:50%;background:${bin.color};border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
                      iconSize: [16, 16],
                      iconAnchor: [8, 8]
                    })
                  })
                  .bindPopup(`
                    <strong>${wardName}</strong><br/>
                    <span style="color:${bin.color}">●</span> ${bin.label}<br/>
                    <strong>${bin.weight}kg</strong>
                  `)
                  .addTo(map);
                  
                  wardBins.push({
                    lat,
                    lng,
                    color: bin.color,
                    weight: bin.weight,
                    label: bin.label,
                    marker,
                    collected: false
                  });
                });
                
                dustbinMarkersRef.current.set(wardName, wardBins);
              }
              
              // Click handler for ward
              layer.on('click', () => {
                if (truckMarkerRef.current) {
                  toast.error("Truck already in operation!", {
                    description: "Please wait for current collection to complete"
                  });
                  return;
                }
                
                const bounds = (layer as L.Polygon).getBounds();
                const center = bounds.getCenter();
                animateTruckCollection(wardName, center, map);
              });
            }
          }
        }).addTo(map);
      })
      .catch((err) => console.error("Error loading wards:", err));

    // Add RTS (Refuse Transfer Stations)
    RTS_LOCATIONS.forEach((rts) => {
      L.marker([rts.lat, rts.lng], {
        icon: L.divIcon({
          className: "",
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background: #f59e0b;
              border: 3px solid white;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 14px;
            ">🏭</div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      })
      .bindPopup(`
        <div style="text-align: center;">
          <strong style="font-size: 14px;">${rts.name}</strong><br/>
          <span style="color: #f59e0b; font-weight: bold;">🏭 Refuse Transfer Station</span><br/>
          <small>Collection Hub</small>
        </div>
      `)
      .addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="ward-map" 
      style={{ height: "100%", width: "100%", borderRadius: "8px", overflow: "hidden" }}
    />
  );
}
