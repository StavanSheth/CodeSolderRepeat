import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WasteSegregationChart } from "@/components/dashboard/WasteSegregationChart";
import { ResourceEfficiencyScorecard } from "@/components/resource-optimization/ResourceEfficiencyScorecard";
import { VehicleUtilizationPanel } from "@/components/resource-optimization/VehicleUtilizationPanel";
import { WorkforceOptimizationPanel } from "@/components/resource-optimization/WorkforceOptimizationPanel";
import { RouteOptimizationPanel } from "@/components/resource-optimization/RouteOptimizationPanel";
import { CapacityUtilizationPanel } from "@/components/resource-optimization/CapacityUtilizationPanel";
import { CostSavingsBreakdown } from "@/components/resource-optimization/CostSavingsBreakdown";
import { AIOptimizationExplanations } from "@/components/resource-optimization/AIOptimizationExplanations";
import { ForecastedResourceSavings } from "@/components/resource-optimization/ForecastedResourceSavings";
import { ResourceHealthIndicators } from "@/components/resource-optimization/ResourceHealthIndicators";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Resource Efficiency Scorecard - Sticky Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-1">
        <ResourceEfficiencyScorecard />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Left Column - Fleet & Workforce */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm">
            <VehicleUtilizationPanel />
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 shadow-sm">
            <WorkforceOptimizationPanel />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 shadow-sm">
              <RouteOptimizationPanel />
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-lg p-4 shadow-sm">
              <CapacityUtilizationPanel />
            </div>
          </div>
        </div>

        {/* Right Column - Savings & Health */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 shadow-sm">
            <CostSavingsBreakdown />
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 shadow-sm">
            <ResourceHealthIndicators />
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 shadow-sm">
            <ForecastedResourceSavings />
          </div>
        </div>
      </div>

      {/* AI Optimization Explanations */}
      <div className="mt-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 shadow-sm">
        <AIOptimizationExplanations />
      </div>

      {/* Waste Segregation Chart - Kept from original */}
      <div className="mt-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 shadow-sm">
        <WasteSegregationChart />
      </div>
    </DashboardLayout>
  );
}
