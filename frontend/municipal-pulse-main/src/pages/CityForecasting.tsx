import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TimelineSlider } from "@/components/forecasting/TimelineSlider";
import { WasteVolumeForecast } from "@/components/forecasting/WasteVolumeForecast";
import { HotspotRiskForecast } from "@/components/forecasting/HotspotRiskForecast";
import { WorkforceFleetForecast } from "@/components/forecasting/WorkforceFleetForecast";
import { InfrastructureLoadForecast } from "@/components/forecasting/InfrastructureLoadForecast";
import { CostSavingsForecast } from "@/components/forecasting/CostSavingsForecast";
import { ForecastExplanationPanel } from "@/components/forecasting/ForecastExplanationPanel";
import { GeneratePlanModal } from "@/components/forecasting/GeneratePlanModal";
import { Button } from "@/components/ui/button";
import { forecastData, TimeHorizon } from "@/data/forecastData";
import { FileText, AlertTriangle } from "lucide-react";

export default function CityForecasting() {
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('today');
  const [planModalOpen, setPlanModalOpen] = useState(false);

  const currentData = forecastData[timeHorizon];
  const baselineData = forecastData['today'];

  const highRiskZones = currentData.risks.filter(r => r.riskLevel === 'high').length;
  const criticalInfrastructure = currentData.infrastructure.filter(i => i.riskLevel === 'high').length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">City Forecasting & Simulation</h1>
          <p className="text-sm text-muted-foreground">
            Anticipate problems, plan resources, and prevent failures
          </p>
        </div>
        <Button 
          onClick={() => setPlanModalOpen(true)}
          disabled={timeHorizon === 'today'}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate Plan
        </Button>
      </div>

      {/* Alert Banner for Future Horizons */}
      {timeHorizon !== 'today' && (highRiskZones > 0 || criticalInfrastructure > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Attention Required for {timeHorizon === '7days' ? '+7 Days' : timeHorizon === '30days' ? '+30 Days' : '+90 Days'}
            </p>
            <p className="text-xs text-amber-700">
              {highRiskZones} high-risk zones and {criticalInfrastructure} critical infrastructure facilities predicted. 
              Click "Generate Plan" for recommended actions.
            </p>
          </div>
        </div>
      )}

      {/* Timeline Slider */}
      <TimelineSlider value={timeHorizon} onChange={setTimeHorizon} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <WasteVolumeForecast 
          data={currentData.waste} 
          timeHorizon={timeHorizon}
          baselineVolume={baselineData.waste.totalVolume}
        />
        <HotspotRiskForecast 
          risks={currentData.risks} 
          timeHorizon={timeHorizon}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <WorkforceFleetForecast 
          data={currentData.workforce} 
          timeHorizon={timeHorizon}
        />
        <InfrastructureLoadForecast 
          data={currentData.infrastructure} 
          timeHorizon={timeHorizon}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <CostSavingsForecast 
          data={currentData.costs} 
          timeHorizon={timeHorizon}
          baselineCost={baselineData.costs.totalCost}
        />
        <ForecastExplanationPanel />
      </div>

      {/* Generate Plan Modal */}
      <GeneratePlanModal 
        open={planModalOpen}
        onOpenChange={setPlanModalOpen}
        actionPlan={currentData.actionPlan}
        timeHorizon={timeHorizon}
      />
    </DashboardLayout>
  );
}
