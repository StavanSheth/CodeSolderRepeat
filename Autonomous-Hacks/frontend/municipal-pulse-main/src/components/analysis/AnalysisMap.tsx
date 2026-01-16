import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";

// Dustbin colors based on fill level
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

interface AnalysisMapProps {
    onDustbinSelect: (binId: number) => void;
    selectedBinId: number | null;
}

export default function AnalysisMap({ onDustbinSelect, selectedBinId }: AnalysisMapProps) {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) return;

        // Initialize map
        const map = L.map("analysis-map").setView([23.0225, 72.5714], 13);
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
                        color: "#6b7280",
                        weight: 1,
                        opacity: 0.5,
                        fillColor: "#cbd5e1",
                        fillOpacity: 0.1
                    }),
                    onEachFeature: (feature, layer) => {
                        if (feature.properties) {
                            const wardName = feature.properties.ward_name || feature.properties.WARD_NO || "Ward";

                            // Add dustbins to each ward
                            if (feature.geometry.type === "Polygon") {
                                const bounds = (layer as L.Polygon).getBounds();
                                const center = bounds.getCenter();

                                // Create 4 dustbins per ward at random unsymmetric positions
                                const dustbinConfig = [
                                    { color: dustbinColors.GREEN, weight: dustbinWeights.GREEN, label: "Low Fill", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                                    { color: dustbinColors.YELLOW, weight: dustbinWeights.YELLOW, label: "Medium Fill", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                                    { color: dustbinColors.RED, weight: dustbinWeights.RED, label: "High Fill", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] },
                                    { color: dustbinColors.DARK_RED, weight: dustbinWeights.DARK_RED, label: "Critical Fill", offset: [Math.random() * 0.004 - 0.002, Math.random() * 0.004 - 0.002] }
                                ];

                                dustbinConfig.forEach((bin, index) => {
                                    const lat = center.lat + bin.offset[0];
                                    const lng = center.lng + bin.offset[1];

                                    // Generate a deterministic ID based on ward and index
                                    // We need to ensure one of them is ID 12.
                                    // Let's say Ward 1 starts at ID 1.
                                    // For now, let's assign random IDs but ensure 12 exists.
                                    // Actually, to make it findable, let's just assign specific IDs 
                                    // or make the click handler return a random ID if not 12, but if we want 12 we need to force it.

                                    // Simple ID generation: hash of coords or just random
                                    let binId = Math.floor(Math.random() * 1000);

                                    // HARDCODE: Place Bin 12 in a specific central ward or just the first created bin
                                    if (wardName.includes("Stadium") || index === 0 && Math.random() > 0.95) {
                                        // small chance to be 12, or we force one specific location later.
                                    }

                                });
                            }
                        }
                    }
                }).addTo(map);

                // MANUALLY ADD TARGET BIN 12 to ensured location
                const targetIcon = L.divIcon({
                    className: "",
                    html: `<div style="width:24px;height:24px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 0 10px #ef4444; animation: pulse 2s infinite;"></div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });

                const targetMarker = L.marker([23.0225, 72.5714], { icon: targetIcon }).addTo(map);
                targetMarker.bindPopup("<strong>Target Dustbin (ID: 12)</strong><br>Click for Analysis");
                targetMarker.on("click", () => {
                    onDustbinSelect(12);
                    toast.info("Selected Dustbin 12");
                });

                // Add some random other bins
                for (let i = 0; i < 50; i++) {
                    const lat = 23.0225 + (Math.random() - 0.5) * 0.1;
                    const lng = 72.5714 + (Math.random() - 0.5) * 0.1;
                    const id = Math.floor(Math.random() * 1000) + 13; // Avoid 12

                    const icon = L.divIcon({
                        className: "",
                        html: `<div style="width:16px;height:16px;border-radius:50%;background:${Math.random() > 0.5 ? '#22c55e' : '#eab308'};border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    });

                    const m = L.marker([lat, lng], { icon }).addTo(map);
                    m.on("click", () => {
                        onDustbinSelect(id);
                        toast.info(`Selected Dustbin ${id}`);
                    });
                }

            })
            .catch((err) => console.error("Error loading wards:", err));

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [onDustbinSelect]);

    return (
        <div
            id="analysis-map"
            style={{ height: "100%", width: "100%", borderRadius: "8px", overflow: "hidden" }}
        />
    );
}
