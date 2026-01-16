import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Wifi, WifiOff, Thermometer, Droplets, Wind, Trash2, MapPin } from "lucide-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

interface SensorData {
    bin_id: number;
    lid_status: string;
    weight_kg: number;
    ammonia_ppm: number;
    fill_level_pct: number;
    timestamp: string;
}

interface DustbinAnalysisPanelProps {
    binId: number | null;
    onClose: () => void;
}

export default function DustbinAnalysisPanel({ binId, onClose }: DustbinAnalysisPanelProps) {
    const [data, setData] = useState<SensorData | null>(null);
    const [history, setHistory] = useState<SensorData[]>([]);
    const [error, setError] = useState(false);
    const [isDummyMode, setIsDummyMode] = useState(false);
    const [showDummyButton, setShowDummyButton] = useState(false);
    const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!binId) return;

        // Reset states on new bin selection
        setData(null);
        setHistory([]);
        setError(false);
        setIsDummyMode(false);
        setShowDummyButton(false);
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

        const fetchData = async () => {
            if (isDummyMode) return; // Stop fetching if in dummy mode

            try {
                const res = await fetch(`http://localhost:8000/sensors/${binId}`);
                if (!res.ok) {
                    throw new Error("Not found");
                }
                const jsonData = await res.json();

                setData(jsonData);
                setError(false);
                setShowDummyButton(false); // Hide button if connection restored
                if (errorTimerRef.current) {
                    clearTimeout(errorTimerRef.current);
                    errorTimerRef.current = null;
                }

                setHistory(prev => {
                    const newHistory = [...prev, jsonData];
                    if (newHistory.length > 20) newHistory.shift();
                    return newHistory;
                });

            } catch (err) {
                console.log(err);
                if (!error && !isDummyMode && binId === 12) {
                    toast.error("Arduino Not Connected", {
                        description: `Could not fetch live data for Dustbin #${binId}`,
                        duration: 3000
                    });
                    // Start timer to show dummy button after 3 seconds
                    if (!errorTimerRef.current) {
                        errorTimerRef.current = setTimeout(() => {
                            setShowDummyButton(true);
                        }, 3000);
                    }
                }
                setError(true);
                // Do not clear data immediately to avoid flickering if it's just a blip, 
                // but if it's the first load, data is null anyway.
            }
        };

        // Initial Fetch
        fetchData();

        // Poll every 2 seconds
        const interval = setInterval(fetchData, 2000);

        return () => {
            clearInterval(interval);
            if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        };
    }, [binId, isDummyMode, error]);

    const loadDummyData = () => {
        setIsDummyMode(true);
        setError(false);
        setShowDummyButton(false);
        setData({
            bin_id: binId || 0,
            lid_status: "CLOSED",
            weight_kg: 5.0,
            ammonia_ppm: 10,
            fill_level_pct: 45,
            timestamp: new Date().toISOString()
        });
        toast.info("Loaded Dummy Data");
    };

    if (!binId) return null;

    const isNA = (error && !isDummyMode) || !data;

    return (
        <div className="absolute top-4 right-4 z-[10000] w-[450px] bg-background/95 backdrop-blur shadow-2xl rounded-xl border border-border flex flex-col max-h-[calc(100vh-2rem)] animate-in slide-in-from-right-10 duration-300">

            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/30 rounded-t-xl">
                <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full animate-pulse", isNA ? "bg-red-500" : isDummyMode ? "bg-blue-500" : "bg-green-500")}></div>
                    <div>
                        <h2 className="font-bold text-lg">Dustbin #{binId}</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {isNA ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3 text-green-500" />}
                            {isNA ? "Not Connected" : isDummyMode ? "Dummy Data Mode" : "Live Connection"}
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">

                    {/* Error / Dummy Button State - Only for Bin 12 */}
                    {showDummyButton && !isDummyMode && binId === 12 && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center animate-in fade-in zoom-in-95">
                            <p className="text-sm font-medium text-destructive mb-2">Connection Lost</p>
                            <Button variant="outline" size="sm" onClick={loadDummyData} className="w-full border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
                                Load Dummy Data
                            </Button>
                        </div>
                    )}

                    {/* Main Visual with Fill Indicator */}
                    <div className="flex justify-center py-4 relative gap-8 items-end pl-8">
                        {/* Added padding/gap for labels */}
                        <div className="relative">
                            <img
                                src="/cartoon_dustbin.png"
                                alt="Dustbin Status"
                                className={cn("w-40 h-40 object-contain transition-all duration-500", isNA ? "grayscale opacity-50" : "drop-shadow-[0_10px_20px_rgba(34,197,94,0.4)]")}
                            />
                        </div>

                        {/* Visual Fill Bar */}
                        {!isNA && data && (
                            <div className="h-40 w-10 bg-gray-200 rounded-full overflow-hidden border border-gray-300 relative flex flex-col justify-end">
                                <div
                                    className="w-full bg-green-500 transition-all duration-500 ease-out"
                                    style={{ height: `${data.fill_level_pct}%` }}
                                />

                                {/* Scale Markers & Labels */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[25, 50, 75, 100].map((pct) => (
                                        <div key={pct} className="absolute w-full flex items-center" style={{ bottom: `${pct}%` }}>
                                            <div className="w-full h-px bg-black/30" />
                                            {/* Label outside the bar */}
                                            <div className="absolute left-full ml-1 text-[10px] font-bold text-muted-foreground w-max shadow-sm px-1 rounded bg-background/50">
                                                {pct}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Address */}
                    <div className="bg-card border rounded-lg p-3 flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Location</p>
                            <p className="text-sm font-medium">{binId === 12 ? "Manek Chowk, Ahmedabad" : "Unknown Location"}</p>
                        </div>
                    </div>

                    {/* Sensor Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <SensorCard
                            icon={Trash2}
                            label="Fill Level"
                            value={isNA ? "NA" : `${data?.fill_level_pct}%`}
                            subtext={isNA ? "" : "Ultrasonic"}
                            color="text-blue-500"
                        />
                        <SensorCard
                            icon={Wind}
                            label="Gas (Ammonia)"
                            value={isNA ? "NA" : `${data?.ammonia_ppm} ppm`}
                            subtext={isNA ? "" : "MQ-135 Sensor"}
                            color="text-yellow-500"
                        />
                        <SensorCard
                            icon={Thermometer}
                            label="Temperature"
                            value={isNA ? "NA" : "28°C"}
                            subtext="Ambience"
                            color="text-orange-500"
                        />
                        <SensorCard
                            icon={Droplets}
                            label="Lid Status"
                            value={isNA ? "NA" : data?.lid_status}
                            subtext={isNA ? "" : data?.lid_status === "OPEN" ? "Open" : "Closed"}
                            color={!isNA && data?.lid_status === "OPEN" ? "text-red-500" : "text-green-500"}
                        />
                    </div>

                    {/* Additional Detail - Weight */}
                    <div className="bg-card border rounded-lg p-3 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Weight</span>
                        <span className="font-mono text-xl font-bold">{isNA ? "NA" : data?.weight_kg.toFixed(2)} kg</span>
                    </div>

                    {/* Charts - Hidden in Dummy Mode */}
                    {!isDummyMode && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Live Trends</h3>

                            <ChartBlock title="Gas Level (ppm)" data={history} dataKey="ammonia_ppm" color="#eab308" isNA={isNA} />
                            <ChartBlock title="Fill Level (%)" data={history} dataKey="fill_level_pct" color="#3b82f6" isNA={isNA} />
                        </div>
                    )}

                </div>
            </ScrollArea>
        </div>
    );
}

function SensorCard({ icon: Icon, label, value, subtext, color }: any) {
    return (
        <Card className="p-3 flex items-start gap-3 hover:bg-accent/50 transition-colors">
            <div className={cn("p-2 rounded-lg bg-background shadow-sm border", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-lg font-bold leading-tight mt-0.5">{value}</p>
                {subtext && <p className="text-[10px] text-muted-foreground mt-1">{subtext}</p>}
            </div>
        </Card>
    );
}

function ChartBlock({ title, data, dataKey, color, isNA }: any) {
    if (isNA) {
        return (
            <div className="h-32 border border-dashed rounded-lg flex items-center justify-center bg-muted/20">
                <span className="text-xs text-muted-foreground">No History Data</span>
            </div>
        )
    }
    return (
        <div className="bg-card border rounded-lg p-3">
            <div className="flex justify-between mb-2">
                <span className="text-xs font-medium">{title}</span>
                <span className="text-xs font-mono">{data.length > 0 ? data[data.length - 1][dataKey] : 0}</span>
            </div>
            <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            labelStyle={{ display: 'none' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: color }}
                        />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#grad-${dataKey})`}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
