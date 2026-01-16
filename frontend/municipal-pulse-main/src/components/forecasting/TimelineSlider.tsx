import { TimeHorizon } from "@/data/forecastData";
import { cn } from "@/lib/utils";

interface TimelineSliderProps {
  value: TimeHorizon;
  onChange: (value: TimeHorizon) => void;
}

const timePoints: { value: TimeHorizon; label: string; sublabel: string }[] = [
  { value: 'today', label: 'Today', sublabel: 'Current State' },
  { value: '7days', label: '+7 Days', sublabel: 'Weekly Forecast' },
  { value: '30days', label: '+30 Days', sublabel: 'Monthly Forecast' },
  { value: '90days', label: '+90 Days', sublabel: 'Quarterly Forecast' },
];

export function TimelineSlider({ value, onChange }: TimelineSliderProps) {
  const currentIndex = timePoints.findIndex(t => t.value === value);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Forecast Timeline</h3>
          <p className="text-xs text-muted-foreground">Select time horizon to view predicted conditions</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Viewing:</span>
          <span className="ml-2 text-sm font-medium text-primary">
            {timePoints.find(t => t.value === value)?.label}
          </span>
        </div>
      </div>
      
      <div className="relative pb-16">
        {/* Track */}
        <div className="h-2 bg-muted rounded-full relative">
          {/* Progress */}
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / (timePoints.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Points */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2" style={{ transform: 'translateY(-3px)' }}>
          {timePoints.map((point, index) => (
            <button
              key={point.value}
              onClick={() => onChange(point.value)}
              className="flex flex-col items-center group"
              style={{ minWidth: '80px' }}
            >
              <div 
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all flex-shrink-0",
                  index <= currentIndex 
                    ? "bg-primary border-primary" 
                    : "bg-background border-muted-foreground/30 hover:border-primary/50"
                )}
              />
              <span className={cn(
                "mt-3 text-xs font-medium transition-colors whitespace-nowrap",
                value === point.value ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {point.label}
              </span>
              <span className="mt-1 text-[10px] text-muted-foreground whitespace-nowrap">
                {point.sublabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
