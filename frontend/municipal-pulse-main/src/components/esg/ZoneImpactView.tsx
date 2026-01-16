import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SponsoredZone } from "@/data/esgData";
import { 
  X, 
  Building2, 
  Calendar, 
  TrendingDown, 
  TrendingUp,
  CheckCircle2,
  Camera,
  Truck,
  Clock,
  Factory,
  Coins,
  FileText,
  Award,
  Globe,
  Info
} from "lucide-react";
import { format } from "date-fns";

interface ZoneImpactViewProps {
  zone: SponsoredZone;
  onClose: () => void;
}

const getVerificationIcon = (method: string) => {
  switch (method) {
    case 'image_analysis': return Camera;
    case 'collection_logs': return Truck;
    case 'timestamp_route': return Clock;
    case 'facility_intake': return Factory;
    default: return CheckCircle2;
  }
};

const getVerificationLabel = (method: string) => {
  switch (method) {
    case 'image_analysis': return 'Image Analysis';
    case 'collection_logs': return 'Collection Logs';
    case 'timestamp_route': return 'Timestamp & Route';
    case 'facility_intake': return 'Facility Intake';
    default: return method;
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Platinum': return 'bg-slate-100 text-slate-800 border-slate-300';
    case 'Gold': return 'bg-amber-50 text-amber-800 border-amber-300';
    case 'Silver': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'Bronze': return 'bg-orange-50 text-orange-800 border-orange-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function ZoneImpactView({ zone, onClose }: ZoneImpactViewProps) {
  const wasteReduction = zone.beforeMetrics.wasteVolume - zone.afterMetrics.wasteVolume;
  const wasteReductionPercent = Math.round((wasteReduction / zone.beforeMetrics.wasteVolume) * 100);
  const cleanlinessImprovement = zone.afterMetrics.cleanlinessScore - zone.beforeMetrics.cleanlinessScore;
  const landfillDiversion = zone.beforeMetrics.landfillPercentage - zone.afterMetrics.landfillPercentage;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{zone.name}</h2>
            <p className="text-sm text-muted-foreground">{zone.ward} • Zone Impact Report</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Zone Context */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Zone Context
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Corporate Sponsor</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{zone.sponsor.logo}</span>
                      </div>
                      <span className="font-medium text-sm">{zone.sponsor.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sponsorship Level</p>
                    <Badge variant="outline" className={`mt-1 ${getLevelColor(zone.sponsor.sponsorshipLevel)}`}>
                      {zone.sponsor.sponsorshipLevel}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Sponsorship Duration</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(zone.sponsorshipStart), 'MMM yyyy')} - {format(new Date(zone.sponsorshipEnd), 'MMM yyyy')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="text-sm mt-1">{zone.sponsor.industry}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Before vs After Impact */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Before vs After Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Waste Volume</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-600">Before</span>
                        <span>{zone.beforeMetrics.wasteVolume} tons</span>
                      </div>
                      <div className="h-2 bg-red-100 rounded-full">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-600">After</span>
                        <span>{zone.afterMetrics.wasteVolume} tons</span>
                      </div>
                      <div className="h-2 bg-emerald-100 rounded-full">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${(zone.afterMetrics.wasteVolume / zone.beforeMetrics.wasteVolume) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{wasteReductionPercent}% reduction</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Cleanliness Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-orange-600">Before</span>
                        <span>{zone.beforeMetrics.cleanlinessScore}/100</span>
                      </div>
                      <div className="h-2 bg-orange-100 rounded-full">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: `${zone.beforeMetrics.cleanlinessScore}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-600">After</span>
                        <span>{zone.afterMetrics.cleanlinessScore}/100</span>
                      </div>
                      <div className="h-2 bg-emerald-100 rounded-full">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${zone.afterMetrics.cleanlinessScore}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">+{cleanlinessImprovement} points</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Landfill Diversion</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-600">Before</span>
                        <span>{zone.beforeMetrics.landfillPercentage}% to landfill</span>
                      </div>
                      <div className="h-2 bg-red-100 rounded-full">
                        <div 
                          className="h-full bg-red-500 rounded-full" 
                          style={{ width: `${zone.beforeMetrics.landfillPercentage}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-600">After</span>
                        <span>{zone.afterMetrics.landfillPercentage}% to landfill</span>
                      </div>
                      <div className="h-2 bg-emerald-100 rounded-full">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${zone.afterMetrics.landfillPercentage}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{landfillDiversion}% diverted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Verification Panel */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                AI Verification Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {zone.verifications.map((verification) => {
                  const Icon = getVerificationIcon(verification.method);
                  return (
                    <div 
                      key={verification.id} 
                      className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100"
                    >
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Icon className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-foreground">
                            {getVerificationLabel(verification.method)}
                          </p>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {verification.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <span>Confidence: <strong className="text-emerald-700">{verification.confidence}%</strong></span>
                          <span>•</span>
                          <span>{format(new Date(verification.timestamp), 'dd MMM yyyy, HH:mm')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* GreenCoins Issuance */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600" />
                GreenCoins Issuance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium">GreenCoins Issued</p>
                  <p className="text-2xl font-bold text-amber-800 mt-1">{zone.greenCoinsIssued.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium">Carbon Reduction</p>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">{zone.carbonReduction} tons CO₂</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600">
                  <strong>Disclaimer:</strong> GreenCoins are internal impact credits used for tracking and reporting purposes only. 
                  They are non-tradable, non-financial, and have no monetary value. They serve as a metric for measuring 
                  environmental impact within this platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ESG & CSR Outputs */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                ESG & CSR Outputs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">ESG Impact Report</p>
                    <p className="text-xs text-muted-foreground">Downloadable PDF with verified metrics</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Carbon Reduction Certificate</p>
                    <p className="text-xs text-muted-foreground">Official certificate for {zone.carbonReduction} tons CO₂</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Public Impact Summary</p>
                    <p className="text-xs text-muted-foreground">Shareable web page for stakeholders</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
