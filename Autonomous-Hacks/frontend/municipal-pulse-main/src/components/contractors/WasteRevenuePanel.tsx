import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Recycle, TrendingUp } from "lucide-react";
import { wasteProcessingRevenue, Contractor } from "@/data/contractorData";

interface WasteRevenuePanelProps {
  contractor: Contractor;
}

export function WasteRevenuePanel({ contractor }: WasteRevenuePanelProps) {
  const revenues = wasteProcessingRevenue.filter(r => r.contractorId === contractor.id);

  const totalRevenue = revenues.reduce((sum, r) => sum + r.salePrice, 0);
  const totalMunicipal = revenues.reduce((sum, r) => sum + r.municipalShare, 0);
  const totalContractor = revenues.reduce((sum, r) => sum + r.contractorShare, 0);
  const totalTons = revenues.reduce((sum, r) => sum + r.quantityTons, 0);

  const getWasteTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Plastic': 'bg-blue-50 text-blue-700 border-blue-200',
      'RDF': 'bg-orange-50 text-orange-700 border-orange-200',
      'Compost': 'bg-green-50 text-green-700 border-green-200',
      'C&D': 'bg-stone-50 text-stone-700 border-stone-200'
    };
    return <Badge variant="outline" className={colors[type] || ''}>{type}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    return `₹${(amount / 1000).toFixed(1)}K`;
  };

  if (revenues.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Recycle className="h-4 w-4 text-muted-foreground" />
            Waste Processing & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No waste processing revenue for this contractor type
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Recycle className="h-4 w-4 text-muted-foreground" />
          Waste Processing & Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-3 bg-muted/50 p-3 rounded-lg">
          <div>
            <span className="text-xs text-muted-foreground">Total Processed</span>
            <p className="text-sm font-semibold">{totalTons} tons</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Revenue</span>
            <p className="text-sm font-semibold text-green-600">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Municipal Share (70%)</span>
            <p className="text-sm font-semibold text-blue-600">{formatCurrency(totalMunicipal)}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Contractor Share (30%)</span>
            <p className="text-sm font-medium">{formatCurrency(totalContractor)}</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-medium">Waste Type</TableHead>
              <TableHead className="text-xs font-medium">Quantity</TableHead>
              <TableHead className="text-xs font-medium">Buyer / Recycler</TableHead>
              <TableHead className="text-xs font-medium text-right">Sale Price</TableHead>
              <TableHead className="text-xs font-medium text-right">Municipal</TableHead>
              <TableHead className="text-xs font-medium text-right">Contractor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenues.map((revenue) => (
              <TableRow key={revenue.id}>
                <TableCell className="py-2">
                  {getWasteTypeBadge(revenue.wasteType)}
                </TableCell>
                <TableCell className="py-2">
                  <span className="text-sm">{revenue.quantityTons} tons</span>
                </TableCell>
                <TableCell className="py-2">
                  <span className="text-sm">{revenue.buyer}</span>
                </TableCell>
                <TableCell className="py-2 text-right">
                  <span className="text-sm font-medium">{formatCurrency(revenue.salePrice)}</span>
                </TableCell>
                <TableCell className="py-2 text-right">
                  <span className="text-sm text-blue-600">{formatCurrency(revenue.municipalShare)}</span>
                </TableCell>
                <TableCell className="py-2 text-right">
                  <span className="text-sm">{formatCurrency(revenue.contractorShare)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">
            City earning <strong>{formatCurrency(totalMunicipal)}</strong> from waste processed by this contractor
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
