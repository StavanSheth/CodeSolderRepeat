import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const wasteData = [
  { name: "Organic / Wet Waste", tons: 1850, color: "hsl(142, 25%, 45%)" },
  { name: "Plastic", tons: 720, color: "hsl(210, 30%, 55%)" },
  { name: "Paper", tons: 480, color: "hsl(215, 20%, 65%)" },
  { name: "Metal", tons: 180, color: "hsl(220, 15%, 50%)" },
  { name: "C&D Waste", tons: 420, color: "hsl(30, 25%, 50%)" },
  { name: "Hazardous / E-waste", tons: 95, color: "hsl(0, 35%, 55%)" },
  { name: "Reject / Mixed", tons: 325, color: "hsl(220, 10%, 40%)" },
];

const totalTons = wasteData.reduce((sum, item) => sum + item.tons, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      tons: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.tons / totalTons) * 100).toFixed(1);
    return (
      <div className="bg-background border border-border rounded-md px-3 py-2 shadow-sm">
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.tons.toLocaleString()} T ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export function WasteSegregationChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Waste Segregation by Type (Tons per Day)
      </h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Chart */}
        <div className="relative w-full lg:w-1/2 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={1}
                dataKey="tons"
                stroke="none"
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Metric */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Waste
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalTons.toLocaleString()} T
              </p>
              <p className="text-xs text-muted-foreground">/ Day</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-2">
          {wasteData.map((item, index) => {
            const percentage = ((item.tons / totalTons) * 100).toFixed(1);
            return (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {item.tons.toLocaleString()} T
                  </span>
                  <span className="text-xs text-muted-foreground w-12 text-right tabular-nums">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
