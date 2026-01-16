import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface HistoryItem {
  id: string;
  location: string;
  wasteType: string;
  priority: "Low" | "Medium" | "High";
  action: "dispatched" | "scheduled" | "non-issue";
  cleanupTime?: string;
  timestamp: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    location: "Ward 12, Main Road",
    wasteType: "Mixed garbage",
    priority: "High",
    action: "dispatched",
    cleanupTime: "2.5 hrs",
    timestamp: "Today, 10:30 AM"
  },
  {
    id: "2",
    location: "Ward 8, Market Area",
    wasteType: "Organic waste",
    priority: "Medium",
    action: "scheduled",
    timestamp: "Today, 9:15 AM"
  },
  {
    id: "3",
    location: "Ward 15, School Zone",
    wasteType: "Plastic waste",
    priority: "Low",
    action: "dispatched",
    cleanupTime: "1.2 hrs",
    timestamp: "Yesterday, 4:45 PM"
  },
  {
    id: "4",
    location: "Ward 3, Park Area",
    wasteType: "Unknown",
    priority: "Low",
    action: "non-issue",
    timestamp: "Yesterday, 2:20 PM"
  }
];

export function HistoryPanel() {
  const getActionBadge = (action: string) => {
    switch (action) {
      case "dispatched":
        return <Badge className="bg-success/10 text-success border-success/20" variant="outline">Dispatched</Badge>;
      case "scheduled":
        return <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">Scheduled</Badge>;
      case "non-issue":
        return <Badge className="bg-muted text-muted-foreground" variant="outline">Non-Issue</Badge>;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-critical";
      case "Medium": return "text-warning";
      default: return "text-success";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div 
              key={item.id} 
              className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-medium">{item.location}</p>
                  <p className="text-xs text-muted-foreground">{item.wasteType}</p>
                </div>
                {getActionBadge(item.action)}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className={getPriorityColor(item.priority)}>{item.priority}</span>
                  {item.cleanupTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.cleanupTime}
                    </span>
                  )}
                </div>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          History helps improve AI recommendations over time
        </p>
      </CardContent>
    </Card>
  );
}
