import { dustbins } from "../data/dustbins";
import { RTS_LOCATIONS } from "../data/rts";
import { distance } from "./distance";

export function simulate(wardId: number, truck: any, update: Function) {
  const bins = dustbins.filter(b => b.wardId === wardId && !b.collected);

  for (const bin of bins) {
    if (truck.load + bin.weight > truck.capacity) {
      const nearestRTS = RTS_LOCATIONS.sort(
        (a, b) => distance(truck, a) - distance(truck, b)
      )[0];

      update({ moveTo: nearestRTS, empty: true });
      return;
    }

    update({ moveTo: bin, collect: bin.id });
    truck.load += bin.weight;
    bin.collected = true;
  }
}
