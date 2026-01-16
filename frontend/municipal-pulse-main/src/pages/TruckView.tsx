import { DashboardLayout } from "@/components/layout/DashboardLayout";
import AhmedabadMapIframe from "@/components/AhmedabadMapIframe";
import AhmedabadWardsMap from "@/components/AhmedabadWardsMap";
export default function TruckView() {   
    return (            
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-120px)] gap-3">
                {/* Header */}
                <div className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                    <div>
                        <h1 className="text-2xl font-bold">Dustbin Tracking - Waste Collection</h1>
                        <p className="text-muted-foreground text-sm mt-1">Click on any ward to dispatch a truck and watch the automated collection process</p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">1000 kg</div>
                            <div className="text-xs text-muted-foreground">Truck Capacity</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-success">310 kg</div>
                            <div className="text-xs text-muted-foreground">Per Ward Avg</div>
                        </div>
                    </div>
                </div>

                {/* Main Map - Full Height */}
                <div className="flex-1 bg-card rounded-lg border border-border p-4 overflow-hidden">
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold">Interactive Ward Map</h2>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                                    <span>Green: 60kg</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                                    <span>Yellow: 60kg</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                                    <span>Red: 90kg</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#991b1b]"></div>
                                    <span>Dark Red: 100kg</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xl">🚛</div>
                                    <span>Truck</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xl">🏭</div>
                                    <span>RTS</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <AhmedabadWardsMap />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}