import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, ImageOff } from "lucide-react";

interface ActionControlsPanelProps {
  isEnabled: boolean;
  onApproveDispatch: () => void;
  onScheduleLater: () => void;
  onMarkNonIssue: () => void;
  onRequestBetterImage: () => void;
}

export function ActionControlsPanel({
  isEnabled,
  onApproveDispatch,
  onScheduleLater,
  onMarkNonIssue,
  onRequestBetterImage
}: ActionControlsPanelProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-card border-t">
      <Button 
        size="lg"
        className="bg-success hover:bg-success/90 text-success-foreground"
        disabled={!isEnabled}
        onClick={onApproveDispatch}
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        Approve & Dispatch
      </Button>
      
      <Button 
        size="lg"
        variant="outline" 
        className="border-warning/50 text-warning hover:bg-warning/10"
        disabled={!isEnabled}
        onClick={onScheduleLater}
      >
        <Clock className="w-4 h-4 mr-2" />
        Schedule for Later
      </Button>
      
      <Button 
        size="lg"
        variant="outline"
        disabled={!isEnabled}
        onClick={onMarkNonIssue}
      >
        <XCircle className="w-4 h-4 mr-2" />
        Mark as Non-Issue
      </Button>
      
      <Button 
        size="lg"
        variant="ghost" 
        className="text-muted-foreground"
        disabled={!isEnabled}
        onClick={onRequestBetterImage}
      >
        <ImageOff className="w-4 h-4 mr-2" />
        Request Better Image
      </Button>

      {!isEnabled && (
        <p className="text-sm text-muted-foreground ml-auto">
          Select an incident to enable actions
        </p>
      )}
    </div>
  );
}
