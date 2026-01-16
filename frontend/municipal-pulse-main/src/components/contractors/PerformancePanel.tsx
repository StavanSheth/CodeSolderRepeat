import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Clock, AlertTriangle, RefreshCw, MessageSquare, IndianRupee, Award, Shield, FileWarning, Brain } from "lucide-react";
import { contractorPerformance, Contractor } from "@/data/contractorData";

interface PerformancePanelProps {
  contractor: Contractor;
}

export function PerformancePanel({ contractor }: PerformancePanelProps) {
  const performance = contractorPerformance.find(p => p.contractorId === contractor.id);

  if (!performance) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Performance & Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No performance data available</p>
        </CardContent>
      </Card>
    );
  }

  const getGradeBadge = (grade: string) => {
    const colors: Record<string, string> = {
      'A': 'bg-green-100 text-green-700 border-green-300',
      'B': 'bg-amber-100 text-amber-700 border-amber-300',
      'C': 'bg-red-100 text-red-700 border-red-300'
    };
    return (
      <Badge variant="outline" className={`${colors[grade]} text-lg px-3 py-1`}>
        Grade {grade}
      </Badge>
    );
  };

  const metrics = [
    { icon: Clock, label: 'Avg Completion Time', value: performance.avgTaskCompletionTime, color: 'text-blue-600' },
    { icon: AlertTriangle, label: 'SLA Breaches', value: performance.slaBreachCount, color: performance.slaBreachCount > 5 ? 'text-red-600' : 'text-amber-600' },
    { icon: RefreshCw, label: 'Rework Rate', value: `${performance.reworkRate}%`, color: performance.reworkRate > 5 ? 'text-red-600' : 'text-green-600' },
    { icon: MessageSquare, label: 'Citizen Complaints', value: performance.citizenComplaints, color: performance.citizenComplaints > 3 ? 'text-red-600' : 'text-green-600' },
    { icon: IndianRupee, label: 'Cost per Ton', value: `₹${performance.costPerTon}`, color: 'text-blue-600' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          Performance & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Grade */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Contractor Grade</span>
          </div>
          {getGradeBadge(performance.grade)}
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Performance Metrics</span>
          <div className="space-y-2">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm">{metric.label}</span>
                </div>
                <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Compliance & Audit</span>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className={`h-4 w-4 ${performance.environmentalCompliance ? 'text-green-600' : 'text-red-600'}`} />
                <span className="text-sm">Environmental Compliance</span>
              </div>
              <Badge variant="outline" className={performance.environmentalCompliance ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                {performance.environmentalCompliance ? 'Compliant' : 'Non-Compliant'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileWarning className={`h-4 w-4 ${performance.reportingDelays > 3 ? 'text-red-600' : 'text-green-600'}`} />
                <span className="text-sm">Reporting Delays</span>
              </div>
              <span className={`text-sm font-medium ${performance.reportingDelays > 3 ? 'text-red-600' : 'text-green-600'}`}>
                {performance.reportingDelays} instances
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Audit Readiness Score</span>
                <span className={`text-sm font-semibold ${performance.auditReadinessScore >= 80 ? 'text-green-600' : performance.auditReadinessScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                  {performance.auditReadinessScore}%
                </span>
              </div>
              <Progress 
                value={performance.auditReadinessScore} 
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* AI Risk Notes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI Insights</span>
          </div>
          <div className="space-y-2">
            {performance.aiRiskNotes.map((note, idx) => {
              const isPositive = note.includes('Eligible') || note.includes('Best') || note.includes('Highest') || note.includes('Model') || note.includes('Zero');
              const isNegative = note.includes('Critical') || note.includes('risk') || note.includes('violation') || note.includes('Recommend');
              return (
                <div 
                  key={idx} 
                  className={`text-xs p-2 rounded-lg border ${
                    isPositive ? 'bg-green-50 border-green-200 text-green-700' :
                    isNegative ? 'bg-red-50 border-red-200 text-red-700' :
                    'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  {note}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
