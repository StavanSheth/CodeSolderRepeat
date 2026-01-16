import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { savingsData } from "@/data/resourceOptimizationData";
import { TrendingUp, IndianRupee } from "lucide-react";

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}

export function CostSavingsBreakdown() {
  const totalSavings = savingsData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Cost & Savings Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs text-right">Savings</TableHead>
              <TableHead className="text-xs text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savingsData.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="text-sm font-medium">{item.category}</TableCell>
                <TableCell className="text-right text-sm font-bold text-success">
                  {formatCurrency(item.amount)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-success text-sm">
                    <TrendingUp className="h-3 w-3" />
                    <span>{item.percentChange}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-success" />
              <span className="text-sm font-semibold text-foreground">Total Savings (MTD)</span>
            </div>
            <span className="text-xl font-bold text-success">{formatCurrency(totalSavings)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Calculated against last quarter baseline
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
