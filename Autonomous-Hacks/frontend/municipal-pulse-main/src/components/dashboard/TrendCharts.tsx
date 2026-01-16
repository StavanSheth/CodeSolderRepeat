import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const wasteProcessingData = [
  { day: "Mon", generated: 1250, processed: 1180 },
  { day: "Tue", generated: 1340, processed: 1290 },
  { day: "Wed", generated: 1180, processed: 1150 },
  { day: "Thu", generated: 1420, processed: 1380 },
  { day: "Fri", generated: 1380, processed: 1340 },
  { day: "Sat", generated: 980, processed: 960 },
  { day: "Sun", generated: 820, processed: 810 },
];

const revenueData = [
  { day: "Mon", revenue: 485000 },
  { day: "Tue", revenue: 520000 },
  { day: "Wed", revenue: 445000 },
  { day: "Thu", revenue: 580000 },
  { day: "Fri", revenue: 545000 },
  { day: "Sat", revenue: 380000 },
  { day: "Sun", revenue: 295000 },
];

const landfillData = [
  { day: "Mon", inflow: 70 },
  { day: "Tue", inflow: 50 },
  { day: "Wed", inflow: 30 },
  { day: "Thu", inflow: 40 },
  { day: "Fri", inflow: 40 },
  { day: "Sat", inflow: 20 },
  { day: "Sun", inflow: 10 },
];

export function TrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Waste Generated vs Processed */}
      <div className="bg-card rounded-md border border-border p-4">
        <h3 className="section-title mb-4">Waste Generated vs Processed</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wasteProcessingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${value}t`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: "11px" }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="generated" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 0, r: 3 }}
                name="Generated"
              />
              <Line 
                type="monotone" 
                dataKey="processed" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 3 }}
                name="Processed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="bg-card rounded-md border border-border p-4">
        <h3 className="section-title mb-4">Revenue This Week</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `₹${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 3 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Landfill Inflow */}
      <div className="bg-card rounded-md border border-border p-4">
        <h3 className="section-title mb-4">Landfill Inflow (tons)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={landfillData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${value}t`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value} tons`, "Inflow"]}
              />
              <Bar 
                dataKey="inflow" 
                fill="hsl(var(--critical))" 
                radius={[4, 4, 0, 0]}
                name="Inflow"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
