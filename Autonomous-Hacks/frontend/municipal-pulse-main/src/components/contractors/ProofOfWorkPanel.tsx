import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle, AlertTriangle, XCircle, MapPin, Clock } from "lucide-react";
import { proofOfWork, Contractor } from "@/data/contractorData";

interface ProofOfWorkPanelProps {
  contractor: Contractor;
}

export function ProofOfWorkPanel({ contractor }: ProofOfWorkPanelProps) {
  const proofs = proofOfWork.filter(p => p.contractorId === contractor.id);

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partial': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getVerificationBadge = (status: string) => {
    const colors: Record<string, string> = {
      'Verified': 'bg-green-50 text-green-700 border-green-200',
      'Partial': 'bg-amber-50 text-amber-700 border-amber-200',
      'Rejected': 'bg-red-50 text-red-700 border-red-200'
    };
    return (
      <Badge variant="outline" className={`${colors[status]} flex items-center gap-1`}>
        {getVerificationIcon(status)}
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Camera className="h-4 w-4 text-muted-foreground" />
          Proof of Work
          <Badge variant="secondary" className="ml-auto text-xs">{proofs.length} submissions</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {proofs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No proof submissions for this contractor</p>
        ) : (
          proofs.map((proof) => (
            <div key={proof.id} className="border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {proof.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {proof.location}
                  </span>
                </div>
                {getVerificationBadge(proof.verificationStatus)}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Before</span>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                    <span className="text-xs text-muted-foreground">Before Image</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">After</span>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                    <span className="text-xs text-muted-foreground">After Image</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">AI Verification</span>
                  <span className="text-xs text-muted-foreground">Confidence: {proof.confidence}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{proof.aiExplanation}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}