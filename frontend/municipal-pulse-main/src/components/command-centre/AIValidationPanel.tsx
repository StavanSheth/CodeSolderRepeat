import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIValidationPanelProps {
  isAnalyzing: boolean;
  validation: {
    imageClarity: "good" | "poor" | "unknown";
    sceneRelevance: "waste" | "not-waste" | "unclear";
    contextConfidence: number;
    isValid: boolean;
    message: string;
  } | null;
}

export function AIValidationPanel({ isAnalyzing, validation }: AIValidationPanelProps) {
  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">AI Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-info" />
            <span className="text-sm">Analyzing image...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!validation) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">AI Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Upload an image to begin analysis
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getClarityColor = (clarity: string) => {
    switch (clarity) {
      case "good": return "text-success";
      case "poor": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "waste": return "text-success";
      case "not-waste": return "text-critical";
      default: return "text-warning";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">AI Validation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Image Clarity</p>
            <p className={cn("text-sm font-medium capitalize", getClarityColor(validation.imageClarity))}>
              {validation.imageClarity}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Scene Relevance</p>
            <p className={cn("text-sm font-medium capitalize", getRelevanceColor(validation.sceneRelevance))}>
              {validation.sceneRelevance === "not-waste" ? "Not Waste" : validation.sceneRelevance}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <p className={cn(
              "text-sm font-medium",
              validation.contextConfidence >= 70 ? "text-success" :
              validation.contextConfidence >= 40 ? "text-warning" : "text-critical"
            )}>
              {validation.contextConfidence}%
            </p>
          </div>
        </div>

        <div className={cn(
          "p-3 rounded-lg flex items-start gap-3",
          validation.isValid ? "bg-success/10" : "bg-warning/10"
        )}>
          {validation.isValid ? (
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{validation.message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
