import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AhmedabadMap() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize map
    const map = L.map("map").setView([23.0225, 72.5714], 11);
    mapRef.current = map;

    // Base OSM tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Heatmap color function
    function getHeatmapColor(amount: number, min: number, max: number) {
      const normalized = (amount - min) / (max - min);
      const r = Math.floor(255 * normalized);
      const g = Math.floor(255 * (1 - normalized));
      return `rgb(${r}, ${g}, 0)`;
    }

    // Load GeoJSON
    fetch("/Wards.geojson") // put file in /public
      .then((res) => res.json())
      .then((wards) => {
        wards.features.forEach((feature: any) => {
          feature.properties.garbage_amount =
            Math.floor(Math.random() * 1000) + 100;
        });

        const amounts = wards.features.map(
          (f: any) => f.properties.garbage_amount
        );
        const minAmount = Math.min(...amounts);
        const maxAmount = Math.max(...amounts);

        const wardsLayer = L.geoJSON(wards, {
          style: (feature: any) => ({
            color: "#000",
            weight: 1,
            fillColor: getHeatmapColor(
              feature.properties.garbage_amount,
              minAmount,
              maxAmount
            ),
            fillOpacity: 0.7,
          }),
          onEachFeature: (feature: any, layer) => {
            layer.bindPopup(
              `<b>Ward:</b> ${feature.properties.Name}<br/>
               <b>Garbage:</b> ${feature.properties.garbage_amount} tons`
            );

            layer.on({
              mouseover: (e: any) => {
                e.target.setStyle({ weight: 3, fillOpacity: 0.9 });
              },
              mouseout: (e: any) => {
                wardsLayer.resetStyle(e.target);
              },
            });
          },
        }).addTo(map);

        map.fitBounds(wardsLayer.getBounds());
      })
      .catch((err) => console.error("Failed to load Wards.geojson", err));

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}
