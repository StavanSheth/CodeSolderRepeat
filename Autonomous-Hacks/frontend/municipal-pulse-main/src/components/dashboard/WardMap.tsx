import { useState } from "react";
import { cn } from "@/lib/utils";

type ViewMode = "waste" | "revenue";

interface Ward {
  id: string;
  name: string;
  wasteLevel: "low" | "medium" | "high" | "critical";
  revenueLevel: "low" | "medium" | "high" | "excellent";
  wasteTons: number;
  revenue: number;
}

const wards: Ward[] = [
  { id: "w1", name: "Ward 1 - Koramangala", wasteLevel: "high", revenueLevel: "excellent", wasteTons: 245, revenue: 125000 },
  { id: "w2", name: "Ward 2 - Indiranagar", wasteLevel: "medium", revenueLevel: "high", wasteTons: 180, revenue: 95000 },
  { id: "w3", name: "Ward 3 - Whitefield", wasteLevel: "critical", revenueLevel: "medium", wasteTons: 320, revenue: 68000 },
  { id: "w4", name: "Ward 4 - Jayanagar", wasteLevel: "low", revenueLevel: "high", wasteTons: 95, revenue: 88000 },
  { id: "w5", name: "Ward 5 - Malleshwaram", wasteLevel: "medium", revenueLevel: "excellent", wasteTons: 165, revenue: 142000 },
  { id: "w6", name: "Ward 6 - HSR Layout", wasteLevel: "high", revenueLevel: "medium", wasteTons: 278, revenue: 72000 },
  { id: "w7", name: "Ward 7 - Electronic City", wasteLevel: "medium", revenueLevel: "low", wasteTons: 198, revenue: 45000 },
  { id: "w8", name: "Ward 8 - Yelahanka", wasteLevel: "low", revenueLevel: "medium", wasteTons: 88, revenue: 58000 },
  { id: "w9", name: "Ward 9 - Banashankari", wasteLevel: "critical", revenueLevel: "low", wasteTons: 385, revenue: 32000 },
];

const wasteColors = {
  low: "bg-success/20 border-success/40 hover:bg-success/30",
  medium: "bg-warning/20 border-warning/40 hover:bg-warning/30",
  high: "bg-critical/20 border-critical/40 hover:bg-critical/30",
  critical: "bg-critical/40 border-critical/60 hover:bg-critical/50",
};

const revenueColors = {
  low: "bg-critical/20 border-critical/40 hover:bg-critical/30",
  medium: "bg-warning/20 border-warning/40 hover:bg-warning/30",
  high: "bg-success/20 border-success/40 hover:bg-success/30",
  excellent: "bg-success/40 border-success/60 hover:bg-success/50",
};

export function WardMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("waste");
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  return (
    <div className="bg-card rounded-md border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">City Ward Overview</h3>
        <div className="flex gap-1 bg-secondary rounded-md p-0.5">
          <button
            onClick={() => setViewMode("waste")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              viewMode === "waste" 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Waste Volume
          </button>
          <button
            onClick={() => setViewMode("revenue")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              viewMode === "revenue" 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Revenue
          </button>
        </div>
      </div>

      {/* Ward Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {wards.map((ward) => (
          <button
            key={ward.id}
            onClick={() => setSelectedWard(ward)}
            className={cn(
              "p-3 rounded border text-left transition-colors",
              viewMode === "waste" ? wasteColors[ward.wasteLevel] : revenueColors[ward.revenueLevel],
              selectedWard?.id === ward.id && "ring-2 ring-primary"
            )}
          >
            <p className="text-xs font-medium text-foreground truncate">{ward.name.split(" - ")[1]}</p>
            <p className="text-lg font-bold text-foreground mt-1">
              {viewMode === "waste" ? `${ward.wasteTons}t` : `₹${(ward.revenue / 1000).toFixed(0)}K`}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Ward Details */}
      {selectedWard && (
        <div className="bg-secondary/50 rounded-md p-3 border border-border">
          <p className="text-sm font-medium text-foreground">{selectedWard.name}</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="data-label">Daily Waste</p>
              <p className="data-value">{selectedWard.wasteTons} tons</p>
            </div>
            <div>
              <p className="data-label">Daily Revenue</p>
              <p className="data-value">₹{selectedWard.revenue.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Legend:</span>
        {viewMode === "waste" ? (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-success/40" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-warning/40" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-critical/40" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-critical/40" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-warning/40" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-success/40" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
