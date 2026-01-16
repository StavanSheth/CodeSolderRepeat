import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, AlertCircle, Gift } from "lucide-react";
import { Contractor } from "@/data/contractorData";

interface ContractOverviewProps {
  contractor: Contractor;
}

export function ContractOverview({ contractor }: ContractOverviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Contract Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Contract Period</span>
            <p className="text-sm font-medium">
              {new Date(contractor.contractStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} – {new Date(contractor.contractEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Assigned Zones</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {contractor.assignedZones.map((zone, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{zone}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs text-muted-foreground">Scope of Work</span>
          <p className="text-sm mt-1">{contractor.scopeOfWork}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Defined KPIs</span>
          </div>
          <div className="grid grid-cols-3 gap-3 bg-muted/50 p-3 rounded-lg">
            <div>
              <span className="text-xs text-muted-foreground">Collection Frequency</span>
              <p className="text-sm font-medium">{contractor.kpis.collectionFrequency}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Segregation Purity</span>
              <p className="text-sm font-medium">{contractor.kpis.segregationPurity}%</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Processing Capacity</span>
              <p className="text-sm font-medium">{contractor.kpis.processingCapacity} TPD</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Penalty Rules</span>
            </div>
            <ul className="space-y-1">
              {contractor.penaltyRules.map((rule, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-red-400">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Incentive Rules</span>
            </div>
            <ul className="space-y-1">
              {contractor.incentiveRules.map((rule, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-green-400">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
