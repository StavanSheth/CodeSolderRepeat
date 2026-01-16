import { Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

export default function Truck() {
  const [pos, setPos] = useState<[number, number]>([23.03, 72.58]);

  return (
    <Marker
      position={pos}
      icon={L.divIcon({
        html: "🚛",
        className: ""
      })}
    />
  );
}
