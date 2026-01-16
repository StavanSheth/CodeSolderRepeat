import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionPlan, TimeHorizon } from "@/data/forecastData";
import { cn } from "@/lib/utils";
import { Users, Truck, CheckCircle, Download, Printer } from "lucide-react";

interface GeneratePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionPlan: ActionPlan[];
  timeHorizon: TimeHorizon;
}

const timeLabels: Record<TimeHorizon, string> = {
  today: 'Today',
  '7days': '+7 Days',
  '30days': '+30 Days',
  '90days': '+90 Days',
};

const priorityColors = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-500' },
  medium: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-500' },
  low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-500' },
};

export function GeneratePlanModal({ open, onOpenChange, actionPlan, timeHorizon }: GeneratePlanModalProps) {
  const totalWorkforceChange = actionPlan.reduce((sum, p) => sum + p.workforceChange, 0);
  const totalVehicleChange = actionPlan.reduce((sum, p) => sum + p.vehicleChange, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            <span>Action Plan for {timeLabels[timeHorizon]}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Printer className="w-3 h-3 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {actionPlan.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground">No Action Required</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current conditions are stable. Continue monitoring.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Additional Workforce</p>
                  <p className="text-xl font-bold text-foreground">+{totalWorkforceChange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Additional Vehicles</p>
                  <p className="text-xl font-bold text-foreground">+{totalVehicleChange}</p>
                </div>
              </div>
            </div>

            {/* Zone-wise Actions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Zone-wise Action Items</h3>
              {actionPlan.map((plan, index) => {
                const colors = priorityColors[plan.priority];
                return (
                  <div key={index} className={cn("rounded-lg border p-4", colors.bg, colors.border)}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-semibold", colors.text)}>{plan.zone}</span>
                        <span className={cn("text-[10px] font-medium text-white px-1.5 py-0.5 rounded uppercase", colors.badge)}>
                          {plan.priority} Priority
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={colors.text}>
                          <Users className="w-3 h-3 inline mr-1" />
                          +{plan.workforceChange}
                        </span>
                        <span className={colors.text}>
                          <Truck className="w-3 h-3 inline mr-1" />
                          +{plan.vehicleChange}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm">
                          <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", colors.badge)} />
                          <span className={colors.text}>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Implementation Timeline */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Implementation Timeline</h4>
              <p className="text-xs text-blue-700">
                Begin deployment within 24 hours. High-priority zones should receive resources first. 
                Monitor daily and adjust as conditions change. Review progress at end of forecast period.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
