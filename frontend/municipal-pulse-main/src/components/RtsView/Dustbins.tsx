import { Marker, Popup } from "react-leaflet";
import { dustbins } from "@/data/dustbins";
import L from "leaflet";

const iconMap: any = {
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow"
};

export default function Dustbins() {
  return (
    <>
      {dustbins.map(bin => (
        !bin.collected && (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={L.divIcon({
              className: "",
              html: `<div style="width:14px;height:14px;border-radius:50%;background:${iconMap[bin.type]}"></div>`
            })}
          >
            <Popup>{bin.type} Bin</Popup>
          </Marker>
        )
      ))}
    </>
  );
}
