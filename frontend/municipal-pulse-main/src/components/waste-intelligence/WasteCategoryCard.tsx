import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WasteCategory, TimeFilter } from "@/data/wasteWorkflowData";

interface WasteCategoryCardProps {
  category: WasteCategory;
  timeFilter: TimeFilter;
  isSelected: boolean;
  onClick: () => void;
}

const getSeverityBadge = (severity: string) => {
  const styles: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  };
  return styles[severity] || styles.low;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

export function WasteCategoryCard({ category, timeFilter, isSelected, onClick }: WasteCategoryCardProps) {
  const data = category.data[timeFilter];

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-primary shadow-md' 
          : 'hover:border-muted-foreground/30'
      }`}
      style={{ 
        backgroundColor: isSelected ? category.bgColor : undefined,
        borderColor: isSelected ? category.borderColor : undefined,
      }}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            <CardTitle className="text-base font-semibold">{category.name}</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs capitalize ${getSeverityBadge(data.severity)}`}
          >
            {data.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">
            {data.quantity.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">TPD</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Segregation Score</span>
          <span className={`font-semibold ${getScoreColor(data.segregationScore)}`}>
            {data.segregationScore}%
          </span>
        </div>
        
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${data.segregationScore}%`,
              backgroundColor: category.color,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
