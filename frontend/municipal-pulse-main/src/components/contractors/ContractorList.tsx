import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Building2 } from "lucide-react";
import { contractors, Contractor } from "@/data/contractorData";

interface ContractorListProps {
  selectedContractor: Contractor | null;
  onSelectContractor: (contractor: Contractor) => void;
}

export function ContractorList({ selectedContractor, onSelectContractor }: ContractorListProps) {
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "text-green-600 bg-green-50";
    if (compliance >= 80) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Released': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Released</Badge>;
      case 'Pending': return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'Partial': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Partial</Badge>;
      default: return null;
    }
  };

  const getContractTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Collection': 'bg-blue-50 text-blue-700 border-blue-200',
      'Processing': 'bg-purple-50 text-purple-700 border-purple-200',
      'MRF': 'bg-teal-50 text-teal-700 border-teal-200',
      'Landfill': 'bg-stone-50 text-stone-700 border-stone-200'
    };
    return <Badge variant="outline" className={colors[type] || ''}>{type}</Badge>;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Contractor List
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[calc(100vh-220px)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-xs font-medium">Contractor</TableHead>
                <TableHead className="text-xs font-medium">Type</TableHead>
                <TableHead className="text-xs font-medium text-center">SLA %</TableHead>
                <TableHead className="text-xs font-medium text-center">Tasks</TableHead>
                <TableHead className="text-xs font-medium">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((contractor) => (
                <TableRow
                  key={contractor.id}
                  className={`cursor-pointer hover:bg-muted/50 ${
                    selectedContractor?.id === contractor.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => onSelectContractor(contractor)}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      {contractor.riskIndicator && (
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate max-w-[140px]">
                          {contractor.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {contractor.assignedZones.length} zone(s)
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    {getContractTypeBadge(contractor.contractType)}
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className={`text-sm font-medium px-2 py-0.5 rounded ${getComplianceColor(contractor.slaCompliance)}`}>
                      {contractor.slaCompliance}%
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className="text-sm font-medium">{contractor.activeTasks}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    {getPaymentBadge(contractor.paymentStatus)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
