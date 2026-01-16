import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeWasteImage } from '@/services/wasteIntelligenceApi';
import { useCommandCentreStore } from '@/stores/commandCentreStore';
import { 
  calculatePIAScore, 
  generateTaskId, 
  createActivityLog 
} from '@/services/commandCentreService';

export function ImageUploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const {
    addWorkItem,
    setIsUploadingImage,
    isUploadingImage,
  } = useCommandCentreStore();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("📸 [UI] File selected:", file.name);
    setIsUploadingImage(true);

    try {
      // Call API to analyze image
      console.log("⏳ [UI] Calling API to analyze image...");
      const incident = await analyzeWasteImage(file);
      console.log("✅ [UI] Incident received from API:", incident);

      // Read image preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imagePreview = reader.result as string;
        console.log("🖼️ [UI] Image preview created");

        // Create work item
        const pia = calculatePIAScore(incident);
        const taskId = generateTaskId(incident);
        console.log("📊 [UI] PIA Score calculated:", pia);
        console.log("🆔 [UI] Task ID generated:", taskId);

        addWorkItem({
          id: taskId,
          incident,
          status: 'new',
          pia,
          createdAt: new Date(),
          imagePreview,
          timeline: [
            createActivityLog('Image Uploaded', `${incident.classification.wasteType} image analyzed`),
            createActivityLog('AI Classification', `Priority: ${incident.priority.level}`),
          ],
        });

        console.log("✅ [UI] Work item added to store");

        toast({
          title: '✅ Image Analyzed',
          description: `${incident.classification.wasteType} classified as ${incident.priority.level} priority (PIA: ${pia})`,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: '❌ Analysis Failed',
        description: 'Could not analyze image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">📸 Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <label
          className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isUploadingImage
              ? 'opacity-50 cursor-not-allowed'
              : 'border-primary/30 hover:border-primary hover:bg-primary/5'
          }`}
        >
          {isUploadingImage ? (
            <>
              <Loader2 className="mx-auto h-8 w-8 text-primary mb-2 animate-spin" />
              <p className="text-sm font-medium">Analyzing...</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploadingImage}
            className="hidden"
          />
        </label>
      </CardContent>
    </Card>
  );
}
