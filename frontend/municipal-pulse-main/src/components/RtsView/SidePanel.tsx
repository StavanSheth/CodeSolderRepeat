import { dustbins } from "@/data/dustbins";

export default function SidePanel({ wardId }: any) {
  return (
    <div>
      {dustbins
        .filter(b => b.wardId === wardId)
        .map(b => (
          <div key={b.id}>
            {b.collected ? "✔️" : "⬜"} {b.type}
          </div>
        ))}
    </div>
  );
}
