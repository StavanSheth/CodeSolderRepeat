import { GeoJSON } from "react-leaflet";
import wards from "@/data/wards.geojson";

export default function WardLayer() {
  return (
    <GeoJSON
      data={wards as any}
      style={() => ({
        color: "#333",
        weight: 1,
        fillOpacity: 0.2
      })}
    />
  );
}
