import { ScrollArea } from "@/components/ui/scroll-area";
import { Contractor } from "@/data/contractorData";
import { ContractOverview } from "./ContactOverview";
import { ActiveTasksTable } from "./ActiveTasksTable";
import { ProofOfWorkPanel } from "./ProofOfWorkPanel";
import { PaymentsBillingPanel } from "./PaymentsBillingPanel";
import { WasteRevenuePanel } from "./WasteRevenuePanel";
import { Building2 } from "lucide-react";

interface ContractorDetailViewProps {
  contractor: Contractor;
}

export function ContractorDetailView({ contractor }: ContractorDetailViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold">{contractor.name}</h2>
            <p className="text-xs text-muted-foreground">
              {contractor.contractType} • {contractor.id}
            </p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <ContractOverview contractor={contractor} />
          <ActiveTasksTable contractor={contractor} />
          <ProofOfWorkPanel contractor={contractor} />
          <PaymentsBillingPanel contractor={contractor} />
          <WasteRevenuePanel contractor={contractor} />
        </div>
      </ScrollArea>
    </div>
  );
}
