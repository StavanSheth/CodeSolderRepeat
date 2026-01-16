import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { invoices, Contractor } from "@/data/contractorData";

interface PaymentsBillingPanelProps {
  contractor: Contractor;
}

export function PaymentsBillingPanel({ contractor }: PaymentsBillingPanelProps) {
  const contractorInvoices = invoices.filter(i => i.contractorId === contractor.id);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'Released': 'bg-green-50 text-green-700 border-green-200',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'Disputed': 'bg-red-50 text-red-700 border-red-200',
      'Partial': 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return <Badge variant="outline" className={colors[status] || ''}>{status}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
          Payments & Billing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contractorInvoices.map((invoice) => (
          <div key={invoice.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Invoice Period</span>
                <p className="text-sm font-medium">{invoice.month}</p>
              </div>
              {getStatusBadge(invoice.status)}
            </div>

            <div className="grid grid-cols-4 gap-3 bg-muted/50 p-3 rounded-lg">
              <div>
                <span className="text-xs text-muted-foreground">Generated</span>
                <p className="text-sm font-medium">{formatCurrency(invoice.generatedAmount)}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Approved</span>
                <p className="text-sm font-medium text-green-600">{formatCurrency(invoice.approvedAmount)}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Penalties</span>
                <p className="text-sm font-medium text-red-600">-{formatCurrency(invoice.penaltiesDeducted)}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Final Payable</span>
                <p className="text-sm font-semibold">{formatCurrency(invoice.finalPayable)}</p>
              </div>
            </div>

            {invoice.deductionReasons.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  <span className="text-xs font-medium text-red-600">Deduction Reasons</span>
                </div>
                <ul className="space-y-1">
                  {invoice.deductionReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-red-400">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {invoice.deductionReasons.length === 0 && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs font-medium">No deductions - Full payment eligible with incentive</span>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t">
              {invoice.status === 'Pending' && (
                <Button size="sm" className="text-xs h-7 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approve Payment
                </Button>
              )}
              <Button variant="outline" size="sm" className="text-xs h-7">
                <FileText className="h-3 w-3 mr-1" />
                View Invoice
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7 text-amber-600 border-amber-200 hover:bg-amber-50">
                Submit Dispute
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
