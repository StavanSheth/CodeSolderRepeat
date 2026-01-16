import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PPPControlBar } from "@/components/contractors/PPPControlBar";
import { ContractorList } from "@/components/contractors/ContractorList";
import { ContractorDetailView } from "@/components/contractors/ContractorDetailView";
import { PerformancePanel } from "@/components/contractors/PerformancePanel";
import { Contractor, contractors } from "@/data/contractorData";
import { Building2 } from "lucide-react";

export default function ContractorsDashboard() {
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(contractors[0]);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <PPPControlBar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Contractor List */}
          <div className="w-[380px] border-r border-border overflow-hidden flex-shrink-0">
            <ContractorList 
              selectedContractor={selectedContractor}
              onSelectContractor={setSelectedContractor}
            />
          </div>

          {/* Center Panel - Contractor Detail View */}
          <div className="flex-1 overflow-hidden bg-muted/30">
            {selectedContractor ? (
              <ContractorDetailView contractor={selectedContractor} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Select a contractor to view details</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Performance & Compliance */}
          <div className="w-[320px] border-l border-border overflow-auto flex-shrink-0 bg-card">
            {selectedContractor ? (
              <PerformancePanel contractor={selectedContractor} />
            ) : (
              <div className="h-full flex items-center justify-center p-4">
                <p className="text-sm text-muted-foreground text-center">Select a contractor to view performance</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
