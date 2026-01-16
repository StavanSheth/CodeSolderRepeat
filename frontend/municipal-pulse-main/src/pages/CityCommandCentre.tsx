import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ImageUploadPanel } from "@/components/command-centre/ImageUploadPanel";
import { TaskQueuePanel } from "@/components/command-centre/TaskQueuePanel";
import { ActionPlanPanel } from "@/components/command-centre/ActionPlanPanel";
import { KPIStatsCard } from "@/components/command-centre/KPIStatsCard";
import { IncidentHeatmap } from "@/components/command-centre/IncidentHeatmap";
import { Card } from "@/components/ui/card";
import { MapPin, Activity } from "lucide-react";
import { useCommandCentreStore } from "@/stores/commandCentreStore";

export default function CityCommandCentre() {
  const { getSelectedWorkItem } = useCommandCentreStore();
  const selectedWorkItem = getSelectedWorkItem();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 bg-background">
        {/* KPI Stats Row */}
        <KPIStatsCard />

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-hidden">
          {/* LEFT COLUMN: Image Upload + Task Queue */}
          <div className="w-1/3 flex flex-col gap-4 overflow-y-auto">
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3">📸 Upload Image</h3>
              <ImageUploadPanel />
            </Card>

            <Card className="p-4 flex-1 overflow-hidden flex flex-col">
              <h3 className="text-sm font-semibold mb-3">📋 Task Queue</h3>
              <div className="overflow-y-auto flex-1">
                <TaskQueuePanel />
              </div>
            </Card>
          </div>

          {/* CENTER COLUMN: Incident Details */}
          <div className="w-1/3 flex flex-col gap-4 overflow-y-auto">
            {selectedWorkItem ? (
              <Card className="p-4 flex-1 overflow-y-auto space-y-4">
                <h3 className="text-sm font-semibold">📊 Incident Details</h3>

                {/* Image Preview */}
                {selectedWorkItem.imagePreview && (
                  <img
                    src={selectedWorkItem.imagePreview}
                    alt="Incident"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}

                {/* Classification */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Classification
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Waste Type:</strong> {selectedWorkItem.incident.classification.wasteType}
                    </p>
                    <p>
                      <strong>Location Type:</strong> {selectedWorkItem.incident.classification.locationType}
                    </p>
                    <p>
                      <strong>Volume:</strong> {selectedWorkItem.incident.classification.estimatedVolume.category}{" "}
                      ({selectedWorkItem.incident.classification.estimatedVolume.tonnageRange})
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Priority & Urgency
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Level:</strong> {selectedWorkItem.incident.priority.level}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedWorkItem.incident.priority.reasons?.join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Location */}
                {selectedWorkItem.incident.location && (
                  <div className="space-y-2 bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-blue-900 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      Location
                    </p>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p>{selectedWorkItem.incident.location.address}</p>
                      <p className="text-xs">
                        Lat: {selectedWorkItem.incident.location.lat?.toFixed(4) || "N/A"}, Lon:{" "}
                        {selectedWorkItem.incident.location.lng?.toFixed(4) || "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Volume & Estimation */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Volume Estimation
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedWorkItem.incident.classification.estimatedVolume.category}
                    </p>
                    <p>
                      <strong>Tonnage Range:</strong>{" "}
                      {selectedWorkItem.incident.classification.estimatedVolume.tonnageRange}
                    </p>
                  </div>
                </div>

                {/* Required Resources */}
                <div className="space-y-2 bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-orange-900">Resources Needed</p>
                  <div className="space-y-1 text-sm text-orange-800">
                    <p>
                      <strong>Workers:</strong>{" "}
                      {selectedWorkItem.incident.recommendation.team.workers}
                    </p>
                    <p>
                      <strong>Vehicles:</strong> {selectedWorkItem.incident.recommendation.vehicles.join(", ")}
                    </p>
                    <p>
                      <strong>Equipment:</strong>{" "}
                      {selectedWorkItem.incident.recommendation.equipment.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                {selectedWorkItem.timeline && selectedWorkItem.timeline.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <Activity className="h-3 w-3" />
                      Timeline
                    </p>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {selectedWorkItem.timeline.map((log, idx) => (
                        <div key={idx} className="text-xs bg-muted p-2 rounded">
                          <p className="font-semibold">{log.action}</p>
                          <p className="text-muted-foreground">{log.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {log.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-4 flex-1 flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center">
                  Select a task to view details
                </p>
              </Card>
            )}
          </div>

          {/* RIGHT COLUMN: Action Plan + Dispatch */}
          <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
            <ActionPlanPanel />
          </div>
        </div>

        {/* HEATMAP: Waste Volume Visualization */}
        <Card className="p-4">
          <IncidentHeatmap />
        </Card>
      </div>
    </DashboardLayout>
  );
}
