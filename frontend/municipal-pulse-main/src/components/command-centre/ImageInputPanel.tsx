import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, MapPin, Clock, User } from "lucide-react";

interface ImageInputPanelProps {
  onImageSelect: (file: File, preview: string) => void;
  imagePreview: string | null;
  imageMetadata: {
    location?: string;
    time?: string;
    source?: string;
  } | null;
}

export function ImageInputPanel({ onImageSelect, imagePreview, imageMetadata }: ImageInputPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Image Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleUploadClick}
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture
          </Button>
        </div>

        {imagePreview ? (
          <div className="space-y-3">
            <div className="border border-border rounded-lg overflow-hidden bg-muted">
              <img 
                src={imagePreview} 
                alt="Uploaded incident" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            {imageMetadata && (
              <div className="space-y-2 text-sm">
                {imageMetadata.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{imageMetadata.location}</span>
                  </div>
                )}
                {imageMetadata.time && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{imageMetadata.time}</span>
                  </div>
                )}
                {imageMetadata.source && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-3.5 h-3.5" />
                    <span>{imageMetadata.source}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Upload or capture an image to analyze
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
