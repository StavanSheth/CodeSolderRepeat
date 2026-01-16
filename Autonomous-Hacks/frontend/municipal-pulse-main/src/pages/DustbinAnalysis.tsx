import { useState } from "react";
import AnalysisMap from "@/components/analysis/AnalysisMap";
import DustbinAnalysisPanel from "@/components/analysis/DustbinAnalysisPanel";

export default function DustbinAnalysis() {
    const [selectedBinId, setSelectedBinId] = useState<number | null>(null);

    const handleDustbinSelect = (binId: number) => {
        setSelectedBinId(prev => prev === binId ? null : binId);
    };

    return (
        <div className="h-full w-full relative">
            <AnalysisMap
                onDustbinSelect={handleDustbinSelect}
                selectedBinId={selectedBinId}
            />

            {selectedBinId && (
                <DustbinAnalysisPanel
                    binId={selectedBinId}
                    onClose={() => setSelectedBinId(null)}
                />
            )}
        </div>
    );
}
