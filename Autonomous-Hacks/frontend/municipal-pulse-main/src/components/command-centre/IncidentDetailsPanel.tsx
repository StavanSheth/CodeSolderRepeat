import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  User, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Users,
  Wrench,
  Truck,
  Image
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IncidentDetails {
  id: string;
  imageUrl: string;
  source: string;
  time: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  classification: {
    wasteType: string;
    estimatedVolume: {
      category: "Small" | "Medium" | "Large";
      tonnageRange: string;
    };
    locationType: string;
  };
  priority: {
    level: "Low" | "Medium" | "High";
    reasons: string[];
  };
  recommendation: {
    team: {
      workers: number;
      skillTypes: string[];
    };
    equipment: string[];
    vehicles: string[];
  };
  status: "pending" | "reviewed" | "dispatched";
}

interface IncidentDetailsPanelProps {
  incident: IncidentDetails | null;
}

export function IncidentDetailsPanel({ incident }: IncidentDetailsPanelProps) {
  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Image className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No Incident Selected</p>
          <p className="text-sm mt-1">Select an image from the sidebar to view details</p>
        </div>
      </div>
    );
  }

  const getPriorityConfig = (level: string) => {
    switch (level) {
      case "High":
        return {
          icon: AlertTriangle,
          color: "bg-critical/10 text-critical border-critical/30",
          label: "Immediate Action Required"
        };
      case "Medium":
        return {
          icon: Clock,
          color: "bg-warning/10 text-warning border-warning/30",
          label: "Schedule for Today"
        };
      default:
        return {
          icon: CheckCircle,
          color: "bg-success/10 text-success border-success/30",
          label: "Monitor / Low Priority"
        };
    }
  };

  const getVolumeColor = (category: string) => {
    switch (category) {
      case "Large": return "bg-critical/10 text-critical border-critical/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-success/10 text-success border-success/20";
    }
  };

  const priorityConfig = getPriorityConfig(incident.priority.level);
  const PriorityIcon = priorityConfig.icon;

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Header with ID and Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Incident {incident.id}</h2>
          <p className="text-muted-foreground">{incident.location.address}</p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "text-sm px-3 py-1",
            incident.status === "dispatched" ? "bg-info/10 text-info" :
            incident.status === "reviewed" ? "bg-muted text-muted-foreground" :
            "bg-warning/10 text-warning"
          )}
        >
          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
        </Badge>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image and Location */}
        <div className="space-y-4">
          {/* Large Image */}
          <Card>
            <CardContent className="p-0">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={incident.imageUrl} 
                  alt="Incident" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-info" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-base font-medium">{incident.location.address}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Coordinates: {incident.location.lat.toFixed(6)}, {incident.location.lng.toFixed(6)}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{incident.time}</span>
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{incident.source}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Classification and Priority */}
        <div className="space-y-4">
          {/* Priority Assessment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Priority Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={cn("flex items-center gap-4 p-4 rounded-lg border-2", priorityConfig.color)}>
                <PriorityIcon className="w-8 h-8" />
                <div>
                  <p className="font-bold text-xl">{incident.priority.level} Priority</p>
                  <p className="text-sm opacity-80">{priorityConfig.label}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Assessment Reasons:</p>
                <ul className="space-y-2">
                  {incident.priority.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Issue Classification */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-muted-foreground" />
                Issue Classification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted/40 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Waste Type</p>
                  <p className="text-sm font-semibold">{incident.classification.wasteType}</p>
                </div>
                <div className="p-4 bg-muted/40 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Volume</p>
                  <Badge variant="outline" className={cn("text-sm", getVolumeColor(incident.classification.estimatedVolume.category))}>
                    {incident.classification.estimatedVolume.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{incident.classification.estimatedVolume.tonnageRange}</p>
                </div>
                <div className="p-4 bg-muted/40 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Location Type</p>
                  <p className="text-sm font-semibold">{incident.classification.locationType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Response Recommendation - Full Width */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Response Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team */}
            <div className="p-4 bg-info/5 rounded-lg border border-info/20">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-info" />
                <span className="font-semibold">Cleaning Team</span>
              </div>
              <p className="text-2xl font-bold text-info mb-2">{incident.recommendation.team.workers} Workers</p>
              <div className="flex flex-wrap gap-1">
                {incident.recommendation.team.skillTypes.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-warning" />
                <span className="font-semibold">Equipment & Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {incident.recommendation.equipment.map((item, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-background">{item}</Badge>
                ))}
              </div>
            </div>

            {/* Vehicles */}
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-success" />
                <span className="font-semibold">Vehicles Required</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {incident.recommendation.vehicles.map((vehicle, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-background">{vehicle}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
