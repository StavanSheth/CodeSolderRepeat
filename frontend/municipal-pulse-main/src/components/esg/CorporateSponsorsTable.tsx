import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { corporateSponsors } from "@/data/esgData";
import { Building2 } from "lucide-react";
import { format } from "date-fns";

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString()}`;
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Platinum': return 'bg-slate-100 text-slate-800 border-slate-300';
    case 'Gold': return 'bg-amber-50 text-amber-800 border-amber-300';
    case 'Silver': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'Bronze': return 'bg-orange-50 text-orange-800 border-orange-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function CorporateSponsorsTable() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          Corporate Sponsors
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Sponsor</TableHead>
              <TableHead className="text-xs">Industry</TableHead>
              <TableHead className="text-xs">Level</TableHead>
              <TableHead className="text-xs text-right">Zones</TableHead>
              <TableHead className="text-xs text-right">Investment</TableHead>
              <TableHead className="text-xs text-right">GreenCoins</TableHead>
              <TableHead className="text-xs">Partner Since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {corporateSponsors.map((sponsor) => (
              <TableRow key={sponsor.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{sponsor.logo}</span>
                    </div>
                    <span className="font-medium text-sm">{sponsor.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {sponsor.industry}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${getLevelColor(sponsor.sponsorshipLevel)}`}>
                    {sponsor.sponsorshipLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {sponsor.activeZones}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {formatCurrency(sponsor.totalInvestment)}
                </TableCell>
                <TableCell className="text-right text-sm font-medium text-amber-600">
                  {sponsor.greenCoinsIssued.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(sponsor.partnerSince), 'MMM yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
