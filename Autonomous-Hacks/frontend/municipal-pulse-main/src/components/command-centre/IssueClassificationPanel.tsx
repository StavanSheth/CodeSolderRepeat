import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Scale, MapPin } from "lucide-react";

interface IssueClassificationPanelProps {
  classification: {
    wasteType: string;
    estimatedVolume: {
      category: "Small" | "Medium" | "Large";
      tonnageRange: string;
    };
    locationType: string;
  } | null;
}

export function IssueClassificationPanel({ classification }: IssueClassificationPanelProps) {
  if (!classification) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Issue Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Classification will appear after validation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVolumeColor = (category: string) => {
    switch (category) {
      case "Small": return "bg-success/10 text-success border-success/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Large": return "bg-critical/10 text-critical border-critical/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Issue Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Waste Type</span>
            </div>
            <p className="font-medium text-sm">{classification.wasteType}</p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Est. Volume</span>
            </div>
            <div className="space-y-1">
              <Badge variant="outline" className={getVolumeColor(classification.estimatedVolume.category)}>
                {classification.estimatedVolume.category}
              </Badge>
              <p className="text-xs text-muted-foreground">{classification.estimatedVolume.tonnageRange}</p>
            </div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Location Type</span>
            </div>
            <p className="font-medium text-sm">{classification.locationType}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
