import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Loader2,
  MapPin,
  Trash2,
  Users,
  Truck,
  TrendingUp,
  Leaf,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { generateWasteSolutions, Incident, Solution } from "@/services/wasteIntelligenceApi";

export default function WasteIntelligence() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Form state for custom scenario
  const [customScenario, setCustomScenario] = useState({
    location: "",
    wasteType: "",
    volume: "",
    priority: "Medium" as "Low" | "Medium" | "High",
  });

  // Predefined waste scenarios for quick testing
  const predefinedScenarios = [
    {
      id: "plastic-beach",
      name: "🏖️ Beach Plastic Waste",
      description: "Large plastic accumulation on Marine Drive beach area",
      incident: {
        id: "scenario-beach-001",
        imageUrl: "https://example.com/beach-waste.jpg",
        source: "Environmental Survey",
        time: new Date().toLocaleTimeString(),
        location: {
          address: "Marine Drive, Mumbai, India",
          lat: 18.943,
          lng: 72.823,
        },
        classification: {
          wasteType: "Plastic",
          estimatedVolume: {
            category: "Large",
            tonnageRange: "2-4 tons",
          },
          locationType: "Beach/Coastal Area",
        },
        priority: {
          level: "High",
          reasons: [
            "Marine ecosystem impact",
            "Tourist area degradation",
            "Potential ocean pollution",
          ],
        },
        recommendation: {
          team: {
            workers: 8,
            skillTypes: ["Coastal cleanup specialists", "Waste sorters"],
          },
          equipment: ["Collection nets", "Sorting bins", "Protective gear"],
          vehicles: ["Beach cleaning vehicle", "Cargo truck"],
        },
        status: "pending",
      } as Incident,
    },
    {
      id: "organic-market",
      name: "🥬 Market Organic Waste",
      description: "Daily organic waste from wholesale vegetable market",
      incident: {
        id: "scenario-market-002",
        imageUrl: "https://example.com/market-waste.jpg",
        source: "Market Authority",
        time: new Date().toLocaleTimeString(),
        location: {
          address: "Crawford Market, Mumbai, India",
          lat: 18.947,
          lng: 72.835,
        },
        classification: {
          wasteType: "Organic/Biodegradable",
          estimatedVolume: {
            category: "Large",
            tonnageRange: "3-5 tons",
          },
          locationType: "Market/Commercial",
        },
        priority: {
          level: "Medium",
          reasons: [
            "Daily recurring waste",
            "Composting potential",
            "Odor and hygiene concerns",
          ],
        },
        recommendation: {
          team: {
            workers: 6,
            skillTypes: ["Waste collectors", "Composting specialists"],
          },
          equipment: ["Biodegradable bags", "Composting bins", "Hand tools"],
          vehicles: ["Garbage truck", "Compost transport"],
        },
        status: "pending",
      } as Incident,
    },
    {
      id: "ewaste-residential",
      name: "⚡ E-Waste Collection Drive",
      description: "Electronic waste collection from residential society",
      incident: {
        id: "scenario-ewaste-003",
        imageUrl: "https://example.com/ewaste.jpg",
        source: "Resident Welfare Association",
        time: new Date().toLocaleTimeString(),
        location: {
          address: "Powai, Mumbai, India",
          lat: 19.117,
          lng: 72.905,
        },
        classification: {
          wasteType: "E-Waste/Hazardous",
          estimatedVolume: {
            category: "Medium",
            tonnageRange: "0.5-1 ton",
          },
          locationType: "Residential Complex",
        },
        priority: {
          level: "High",
          reasons: [
            "Hazardous materials present",
            "Requires specialized handling",
            "Valuable material recovery potential",
          ],
        },
        recommendation: {
          team: {
            workers: 4,
            skillTypes: ["E-waste handlers", "Safety supervisors"],
          },
          equipment: ["ESD bags", "Safety gear", "Dismantling tools"],
          vehicles: ["Specialized e-waste vehicle"],
        },
        status: "pending",
      } as Incident,
    },
  ];

  const handleGenerateSolutions = async (incident: Incident) => {
    setIsGenerating(true);
    setSolutions([]);

    try {
      console.log("🚀 Generating solutions for scenario:", incident.id);
      const generatedSolutions = await generateWasteSolutions(incident);

      setSolutions(generatedSolutions);
      toast({
        title: "✨ Solutions Generated",
        description: `${generatedSolutions.length} AI-optimized solutions created`,
      });
    } catch (error) {
      console.error("Error generating solutions:", error);
      toast({
        title: "❌ Generation Failed",
        description: "Could not generate solutions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScenarioClick = (scenarioId: string) => {
    const scenario = predefinedScenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenarioId);
      handleGenerateSolutions(scenario.incident);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Waste Intelligence API Demo
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered waste management solution generator using LangChain + Gemini 2.5 Flash
          </p>
        </div>

        {/* Quick Scenarios */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">🎯 Try Predefined Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predefinedScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${selectedScenario === scenario.id ? "ring-2 ring-primary" : ""
                  }`}
                onClick={() => handleScenarioClick(scenario.id)}
              >
                <CardHeader>
                  <CardTitle className="text-base">{scenario.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {scenario.incident.location.address.split(",")[0]}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Trash2 className="h-3 w-3" />
                    {scenario.incident.classification.wasteType}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-semibold">🧠 AI is analyzing waste scenario...</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generating optimized solutions with LangChain + Gemini 2.5 Flash
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Solutions Display */}
        {solutions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ✨ Generated Solutions ({solutions.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSolutions([]);
                  setSelectedScenario(null);
                }}
              >
                Clear Results
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solutions.map((solution, idx) => (
                <Card key={solution.solution_id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Solution {idx + 1}: {solution.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{solution.objective}</p>
                      </div>
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        Score: {solution.expected_outcomes.overall_sustainability_score}/100
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {/* Strategy */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-blue-900 mb-2">📋 STRATEGY</p>
                      <p className="text-sm text-blue-800 font-medium">
                        • {solution.strategy.primary_focus}
                      </p>
                      {solution.strategy.secondary_focus.map((focus, i) => (
                        <p key={i} className="text-sm text-blue-700 ml-2">
                          ◦ {focus}
                        </p>
                      ))}
                    </div>

                    {/* Steps */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        📝 ACTION STEPS
                      </p>
                      <div className="space-y-2">
                        {solution.steps.map((step) => (
                          <div key={step.step_no} className="bg-muted p-3 rounded-lg space-y-1">
                            <p className="text-sm font-semibold">
                              {step.step_no}. {step.action}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                            <div className="flex items-start gap-2 mt-2">
                              <Leaf className="h-3 w-3 text-green-600 mt-0.5" />
                              <p className="text-xs text-green-700">{step.eco_benefit}</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <Users className="h-3 w-3 text-blue-600 mt-0.5" />
                              <p className="text-xs text-blue-700">{step.responsible_team}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expected Outcomes */}
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-purple-900 mb-2">
                        🎯 EXPECTED OUTCOMES
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="font-bold text-purple-800">
                              {solution.expected_outcomes.landfill_diversion_percent}%
                            </p>
                            <p className="text-xs text-purple-600">Landfill Diversion</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="font-bold text-green-800">
                              {solution.expected_outcomes.estimated_carbon_reduction_kg}kg
                            </p>
                            <p className="text-xs text-green-600">CO₂ Reduction</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-purple-200">
                        <p className="text-xs text-purple-700">
                          💧 Water Risk:{" "}
                          <span className="font-semibold capitalize">
                            {solution.expected_outcomes.water_contamination_risk}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Monitoring */}
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-green-900 mb-2">
                        📊 MONITORING & COMPLIANCE
                      </p>
                      <div className="space-y-1 text-xs text-green-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" />
                          Progress Tracking:{" "}
                          {solution.monitoring.progress_tracking ? "Enabled" : "Disabled"}
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" />
                          Environmental Audit:{" "}
                          {solution.monitoring.environmental_audit_required ? "Required" : "Optional"}
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-3 w-3" />
                          Compliance Checkpoints: {solution.monitoring.compliance_checkpoints}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
