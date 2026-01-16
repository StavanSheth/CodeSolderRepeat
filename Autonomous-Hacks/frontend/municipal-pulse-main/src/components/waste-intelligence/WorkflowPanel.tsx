import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WasteCategory, TimeFilter } from "@/data/wasteWorkflowData";
import { WasteWorkflowDiagram } from "./WasteWorkflowDiagram";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowPanelProps {
  category: WasteCategory | null;
  timeFilter: TimeFilter;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkflowPanel({ category, timeFilter, isOpen, onClose }: WorkflowPanelProps) {
  if (!category) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl p-0 bg-background"
      >
        <SheetHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <SheetTitle className="text-lg font-bold">{category.name} Workflow</SheetTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Recommended handling process
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="p-6">
            <WasteWorkflowDiagram category={category} timeFilter={timeFilter} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
