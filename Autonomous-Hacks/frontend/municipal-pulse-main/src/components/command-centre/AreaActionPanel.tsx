import { useState } from "react";
import { AreaData } from "@/data/areaData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Clock,
  Truck,
  Wrench,
  Trash2,
  ChevronDown,
  ChevronUp,
  Image,
  History,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  X,
  Send,
  CalendarClock,
  Eye,
  ClipboardCheck
} from "lucide-react";

interface AreaActionPanelProps {
  area: AreaData | null;
  onClose: () => void;
  onApproveDispatch: () => void;
  onScheduleLater: () => void;
  onMarkMonitor: () => void;
  onRequestVerification: () => void;
}

export function AreaActionPanel({
  area,
  onClose,
  onApproveDispatch,
  onScheduleLater,
  onMarkMonitor,
  onRequestVerification
}: AreaActionPanelProps) {
  const [showImages, setShowImages] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (!area) return null;

  const getSeverityConfig = (severity: AreaData["severity"]) => {
    switch (severity) {
      case "critical":
        return { label: "Critical", color: "bg-red-100 text-red-800 border-red-200" };
      case "high":
        return { label: "High Priority", color: "bg-orange-100 text-orange-800 border-orange-200" };
      case "medium":
        return { label: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
      case "low":
        return { label: "Low", color: "bg-green-100 text-green-800 border-green-200" };
      case "negligible":
        return { label: "Negligible", color: "bg-blue-100 text-blue-800 border-blue-200" };
    }
  };

  const getTrendIcon = (trend: AreaData["trend"]) => {
    switch (trend) {
      case "improving": return <TrendingDown className="w-4 h-4 text-green-600" />;
      case "worsening": return <TrendingUp className="w-4 h-4 text-red-600" />;
      case "stable": return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getConfidenceIcon = (confidence: AreaData["confidence"]) => {
    switch (confidence) {
      case "high": return <ShieldCheck className="w-4 h-4 text-green-600" />;
      case "medium": return <ShieldQuestion className="w-4 h-4 text-yellow-600" />;
      case "low": return <ShieldAlert className="w-4 h-4 text-red-600" />;
    }
  };

  const severityConfig = getSeverityConfig(area.severity);

  return (
    <div className="w-96 h-full border-l bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b px-4 py-3 bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-lg text-foreground truncate">{area.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground truncate">{area.ward}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Low Confidence Warning */}
          {area.confidence === "low" && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Low confidence – no action recommended</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Data quality is insufficient for reliable assessment. Consider requesting field verification before dispatch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Area Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Area Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Severity Level</span>
                <Badge className={cn("border", severityConfig.color)}>
                  {severityConfig.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Trend</span>
                <div className="flex items-center gap-1.5">
                  {getTrendIcon(area.trend)}
                  <span className="text-sm capitalize">{area.trend}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <div className="flex items-center gap-1.5">
                  {getConfidenceIcon(area.confidence)}
                  <span className="text-sm capitalize">{area.confidence}</span>
                  <span className="text-xs text-muted-foreground">({area.confidenceScore}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reports</span>
                <span className="text-sm font-medium">{area.reportCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{area.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>

          {/* Manpower Recommendation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manpower Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Workers Required</span>
                <span className="text-sm font-semibold">
                  {area.manpower.workersMin} - {area.manpower.workersMax}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Supervisor</span>
                <Badge variant={area.manpower.supervisorRequired ? "default" : "secondary"}>
                  {area.manpower.supervisorRequired ? "Required" : "Not Required"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Est. Duration</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm">{area.manpower.estimatedDuration}</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Skill Types Needed</p>
                <div className="flex flex-wrap gap-1.5">
                  {area.manpower.skillTypes.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment & Vehicles */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Equipment & Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {area.equipment.vehicles.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Vehicles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.equipment.vehicles.map((vehicle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {vehicle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {area.equipment.tools.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Tools</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.equipment.tools.map((tool, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {area.equipment.specialEquipment.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Special Equipment</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.equipment.specialEquipment.map((eq, idx) => (
                      <Badge key={idx} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Waste Type Estimation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Waste Type Estimation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {area.wasteTypes.map((waste, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{waste.type}</span>
                        <span className="text-sm text-muted-foreground">{waste.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary/60 rounded-full"
                          style={{ width: `${waste.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optional: Sample Images (Collapsed) */}
          {area.sampleImages && area.sampleImages.length > 0 && (
            <Collapsible open={showImages} onOpenChange={setShowImages}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        Sample Supporting Images
                      </div>
                      {showImages ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2">
                      {area.sampleImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Sample ${idx + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* Optional: History (Collapsed) */}
          {area.history.length > 0 && (
            <Collapsible open={showHistory} onOpenChange={setShowHistory}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Cleanup History
                      </div>
                      {showHistory ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {area.history.map((h, idx) => (
                        <div key={idx} className="text-sm border-l-2 border-muted pl-3 py-1">
                          <p className="font-medium">{h.action}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{h.date}</span>
                            {h.responseTime !== "-" && (
                              <>
                                <span>•</span>
                                <span>Response: {h.responseTime}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 border-t p-4 bg-muted/30 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onApproveDispatch} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Approve & Dispatch
          </Button>
          <Button variant="secondary" onClick={onScheduleLater} className="w-full">
            <CalendarClock className="w-4 h-4 mr-2" />
            Schedule Later
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onMarkMonitor} className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Monitor Only
          </Button>
          <Button variant="outline" onClick={onRequestVerification} className="w-full">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Field Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
