import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ESGOverviewCards } from "@/components/esg/ESGOverviewCards";
import { SponsoredZoneMap } from "@/components/esg/SponsoredZoneMap";
import { CorporateSponsorsTable } from "@/components/esg/CorporateSponsorsTable";
import { ZoneImpactView } from "@/components/esg/ZoneImpactView";
import { SponsoredZone } from "@/data/esgData";
import { Leaf } from "lucide-react";

export default function CorporatePartnerships() {
  const [selectedZone, setSelectedZone] = useState<SponsoredZone | null>(null);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-background min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                Corporate Partnerships (ESG & CSR)
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-11">
              AI-verified environmental impact tracking for corporate sustainability programs
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <ESGOverviewCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sponsored Zone Map */}
          <SponsoredZoneMap 
            onZoneSelect={setSelectedZone}
            selectedZoneId={selectedZone?.id}
          />

          {/* Corporate Sponsors Table */}
          <CorporateSponsorsTable />
        </div>

        {/* Zone Impact View Drawer */}
        {selectedZone && (
          <ZoneImpactView 
            zone={selectedZone} 
            onClose={() => setSelectedZone(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}
