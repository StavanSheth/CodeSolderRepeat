import { Card } from "@/components/ui/card";
import { Users, FileText, CheckCircle, IndianRupee, AlertTriangle } from "lucide-react";
import { pppMetrics } from "@/data/contractorData";

export function PPPControlBar() {
  const metrics = [
    {
      label: "Total Contractors",
      value: pppMetrics.totalContractors,
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Active Contracts",
      value: pppMetrics.activeContracts,
      icon: FileText,
      color: "text-blue-600"
    },
    {
      label: "SLA Compliance",
      value: `${pppMetrics.avgSlaCompliance}%`,
      icon: CheckCircle,
      color: pppMetrics.avgSlaCompliance >= 90 ? "text-green-600" : "text-amber-600"
    },
    {
      label: "Pending Payments",
      value: `₹${(pppMetrics.pendingPayments / 100000).toFixed(1)}L`,
      icon: IndianRupee,
      color: "text-blue-600"
    },
    {
      label: "High-Risk Contractors",
      value: pppMetrics.highRiskContractors,
      icon: AlertTriangle,
      color: pppMetrics.highRiskContractors > 0 ? "text-red-600" : "text-green-600"
    }
  ];

  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold text-foreground">PPP & Contractors Dashboard</h1>
        <div className="flex items-center gap-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="flex items-center gap-2 px-4 py-2 bg-card">
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{metric.label}</span>
                <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
