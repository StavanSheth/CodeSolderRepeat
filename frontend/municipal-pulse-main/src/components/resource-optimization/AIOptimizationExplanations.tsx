import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiOptimizations } from "@/data/resourceOptimizationData";
import { Brain, CheckCircle } from "lucide-react";

export function AIOptimizationExplanations() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-info" />
          <CardTitle className="text-base font-semibold">How the System Optimized Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {aiOptimizations.map((optimization, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{optimization}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
