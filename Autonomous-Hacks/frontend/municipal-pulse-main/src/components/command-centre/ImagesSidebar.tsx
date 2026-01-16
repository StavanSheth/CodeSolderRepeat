import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Camera } from "lucide-react";
import { Incident } from "@/data/dummyIncidents";

interface ImagesSidebarProps {
  images: Incident[];
  selectedImageId: string | null;
  onSelectImage: (id: string) => void;
}

export function ImagesSidebar({ images, selectedImageId, onSelectImage }: ImagesSidebarProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-critical/10 text-critical border-critical/30";
      case "Medium": return "bg-warning/10 text-warning border-warning/30";
      default: return "bg-success/10 text-success border-success/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dispatched": return "bg-info/10 text-info";
      case "reviewed": return "bg-muted text-muted-foreground";
      default: return "bg-warning/10 text-warning";
    }
  };

  return (
    <div className="w-64 flex-shrink-0 bg-card border-r flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Received Images
          </h2>
          <Badge variant="outline" className="text-xs">
            {images.length}
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => onSelectImage(image.id)}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer transition-all border-2",
                selectedImageId === image.id 
                  ? "border-info ring-2 ring-info/20" 
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <div className="aspect-video bg-muted">
                <img 
                  src={image.imageUrl} 
                  alt={`Incident ${image.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Priority Badge */}
              <div className="absolute top-1.5 right-1.5">
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", getPriorityColor(image.priority.level))}>
                  {image.priority.level}
                </Badge>
              </div>

              {/* Status Badge */}
              <div className="absolute top-1.5 left-1.5">
                <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", getStatusColor(image.status))}>
                  {image.status}
                </Badge>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <div className="flex items-center gap-1 text-[10px] text-white/90">
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="truncate">{image.location.address.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/70 mt-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{image.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
