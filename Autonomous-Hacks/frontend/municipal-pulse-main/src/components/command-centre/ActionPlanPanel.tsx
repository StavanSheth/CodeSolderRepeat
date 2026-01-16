import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Zap, Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useCommandCentreStore } from '@/stores/commandCentreStore';
import { generateWasteSolutions } from '@/services/wasteIntelligenceApi';
import { createActivityLog } from '@/services/commandCentreService';

export function ActionPlanPanel() {
  const { toast } = useToast();
  const {
    getSelectedWorkItem,
    updateWorkItem,
    isGeneratingPlan,
    setIsGeneratingPlan,
  } = useCommandCentreStore();

  const workItem = getSelectedWorkItem();

  if (!workItem) {
    return (
      <Card className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-center text-sm">
          Select a task to view action plan
        </p>
      </Card>
    );
  }

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);

    try {
      const solutions = await generateWasteSolutions(workItem.incident);

      updateWorkItem(workItem.id, {
        solutions,
        status: 'planned',
        timeline: [
          ...workItem.timeline,
          createActivityLog('Plan Generated', `${solutions.length} solutions created`),
        ],
      });

      toast({
        title: '✨ Plan Generated',
        description: `${solutions.length} action solutions created by AI`,
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        title: '❌ Generation Failed',
        description: 'Could not generate action plan',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleDispatch = () => {
    if (!workItem.solutions) {
      toast({
        title: 'ℹ️ Generate Plan First',
        description: 'Create an action plan before dispatching',
        variant: 'default',
      });
      return;
    }

    const dispatchedAt = new Date();
    updateWorkItem(workItem.id, {
      status: 'dispatched',
      assignedTeam: {
        workers: Array(workItem.incident.recommendation?.team?.workers || 2)
          .fill(0)
          .map((_, i) => `Worker ${i + 1}`),
        vehicle: workItem.incident.recommendation?.vehicles?.[0] || 'Truck',
        dispatchedAt,
      },
      timeline: [
        ...workItem.timeline,
        createActivityLog(
          'Team Dispatched',
          `${workItem.incident.recommendation?.team?.workers || 2} workers dispatched`
        ),
      ],
    });

    toast({
      title: '🚚 Team Dispatched',
      description: `${workItem.incident.recommendation?.team?.workers || 2} workers en route`,
    });
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-2">
        <Button
          onClick={handleGeneratePlan}
          disabled={isGeneratingPlan || !!workItem.solutions}
          className="bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          {isGeneratingPlan ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-1" />
              Generate Plan
            </>
          )}
        </Button>
        <Button
          onClick={handleDispatch}
          disabled={workItem.status === 'dispatched'}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <Send className="h-4 w-4 mr-1" />
          Dispatch
        </Button>
      </div>

      {/* Solutions/Plan Display */}
      {workItem.solutions ? (
        <Card className="flex-1 overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-sm">✨ Action Plan ({workItem.solutions.length} solutions)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workItem.solutions.map((solution, idx) => (
              <div key={idx} className="border-l-4 border-primary pl-3 py-2 space-y-2">
                <div>
                  <p className="text-sm font-semibold">{solution.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{solution.objective}</p>
                </div>

                {/* Strategy */}
                {solution.strategy && (
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <p className="font-semibold text-blue-900">Strategy</p>
                    <p className="text-blue-800">• {solution.strategy.primary_focus}</p>
                    {solution.strategy.secondary_focus.map((focus, i) => (
                      <p key={i} className="text-blue-800">
                        • {focus}
                      </p>
                    ))}
                  </div>
                )}

                {/* Steps */}
                {solution.steps && solution.steps.length > 0 && (
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Steps:</p>
                    {solution.steps.map((step, i) => (
                      <div key={i} className="bg-muted p-2 rounded ml-2">
                        <p className="font-semibold">
                          Step {step.step_no}: {step.action}
                        </p>
                        <p className="text-muted-foreground mt-0.5">{step.description}</p>
                        <p className="mt-1">🌱 {step.eco_benefit}</p>
                        <p className="text-muted-foreground">👥 {step.responsible_team}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expected Outcomes */}
                {solution.expected_outcomes && (
                  <div className="text-xs space-y-1 bg-purple-50 p-2 rounded">
                    <p className="font-semibold text-purple-900">Expected Outcomes</p>
                    <p className="text-purple-800">
                      📊 <strong>{solution.expected_outcomes.landfill_diversion_percent}%</strong>{' '}
                      landfill diversion
                    </p>
                    <p className="text-purple-800">
                      🌍 <strong>{solution.expected_outcomes.estimated_carbon_reduction_kg}kg</strong> CO₂
                      reduction
                    </p>
                    <p className="text-purple-800">
                      ✨ <strong>{solution.expected_outcomes.overall_sustainability_score}/100</strong>{' '}
                      sustainability score
                    </p>
                    <p className="text-purple-800 mt-1">
                      💧 Water contamination risk: {solution.expected_outcomes.water_contamination_risk}
                    </p>
                  </div>
                )}

                {/* Monitoring */}
                {solution.monitoring && (
                  <div className="text-xs space-y-1 bg-green-50 p-2 rounded">
                    <p className="font-semibold text-green-900">Monitoring</p>
                    <p className="text-green-800">
                      {solution.monitoring.progress_tracking ? '✅' : '❌'} Progress tracking
                    </p>
                    <p className="text-green-800">
                      {solution.monitoring.environmental_audit_required ? '⚠️' : '✅'} Environmental
                      audit
                    </p>
                    <p className="text-green-800">
                      📋 {solution.monitoring.compliance_checkpoints} compliance checkpoints
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="flex-1 flex items-center justify-center">
          <CardContent className="text-center">
            <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              Click "Generate Plan" to create action solutions
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dispatch Status */}
      {workItem.assignedTeam && (
        <Card className="flex-shrink-0 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Team Dispatched
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Vehicle:</strong> {workItem.assignedTeam.vehicle}
            </p>
            <p>
              <strong>Workers:</strong> {workItem.assignedTeam.workers.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {workItem.assignedTeam.dispatchedAt.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
