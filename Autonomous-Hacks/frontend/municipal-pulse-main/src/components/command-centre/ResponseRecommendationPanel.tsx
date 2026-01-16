import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wrench, Truck } from "lucide-react";

interface ResponseRecommendationPanelProps {
  recommendation: {
    team: {
      workers: number;
      skillTypes: string[];
    };
    equipment: string[];
    vehicles: string[];
  } | null;
}

export function ResponseRecommendationPanel({ recommendation }: ResponseRecommendationPanelProps) {
  if (!recommendation) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Response Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Recommendations will appear after classification
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Response Recommendation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cleaning Team */}
        <div className="p-4 bg-muted/30 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-info" />
            <span className="text-sm font-medium">Cleaning Team</span>
          </div>
          <div className="pl-6 space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Workers Required:</span>{" "}
              <span className="font-medium">{recommendation.team.workers}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.team.skillTypes.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment & Tools */}
        <div className="p-4 bg-muted/30 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Equipment & Tools</span>
          </div>
          <div className="pl-6 flex flex-wrap gap-1.5">
            {recommendation.equipment.map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Vehicles */}
        <div className="p-4 bg-muted/30 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Vehicles</span>
          </div>
          <div className="pl-6 flex flex-wrap gap-1.5">
            {recommendation.vehicles.map((vehicle, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {vehicle}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          These recommendations are editable by the officer
        </p>
      </CardContent>
    </Card>
  );
}
