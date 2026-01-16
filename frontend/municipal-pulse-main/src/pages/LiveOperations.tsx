import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Users, 
  MapPin, 
  Clock,
  Navigation,
  Fuel,
  CheckCircle2,
  AlertCircle,
  Radio,
  Route,
  Activity,
  Timer,
  TrendingUp
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LiveOperations() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>("TRK-001");

  // Mock fleet data
  const vehicles = [
    {
      id: "TRK-001",
      name: "Garbage Truck 1",
      status: "collecting",
      location: { lat: 19.076, lng: 72.877, address: "Bandra West, Mumbai" },
      crew: ["Ramesh K.", "Suresh P.", "Mahesh S."],
      route: [
        { lat: 19.076, lng: 72.877, incident: "INC-234", time: "10:30 AM" },
        { lat: 19.082, lng: 72.883, incident: "INC-235", time: "11:15 AM" },
        { lat: 19.089, lng: 72.890, incident: "INC-236", time: "12:00 PM", current: true },
      ],
      speed: 35,
      fuelLevel: 78,
      tasksCompleted: 12,
      tasksRemaining: 4,
      efficiency: 94,
    },
    {
      id: "TRK-002",
      name: "Garbage Truck 2",
      status: "in_transit",
      location: { lat: 19.125, lng: 72.845, address: "Andheri East, Mumbai" },
      crew: ["Prakash M.", "Vijay R."],
      route: [
        { lat: 19.125, lng: 72.845, incident: "INC-240", time: "10:45 AM" },
        { lat: 19.132, lng: 72.851, incident: "INC-241", time: "11:30 AM", current: true },
        { lat: 19.138, lng: 72.858, incident: "INC-242", time: "12:15 PM" },
      ],
      speed: 42,
      fuelLevel: 65,
      tasksCompleted: 8,
      tasksRemaining: 6,
      efficiency: 87,
    },
    {
      id: "TRK-003",
      name: "Garbage Truck 3",
      status: "idle",
      location: { lat: 19.047, lng: 72.915, address: "Powai, Mumbai" },
      crew: ["Ganesh T.", "Anil D.", "Ravi K."],
      route: [],
      speed: 0,
      fuelLevel: 92,
      tasksCompleted: 15,
      tasksRemaining: 0,
      efficiency: 98,
    },
    {
      id: "TRK-004",
      name: "Compactor Van",
      status: "collecting",
      location: { lat: 18.975, lng: 72.825, address: "Worli, Mumbai" },
      crew: ["Santosh B.", "Mohan L."],
      route: [
        { lat: 18.975, lng: 72.825, incident: "INC-250", time: "09:30 AM" },
        { lat: 18.982, lng: 72.831, incident: "INC-251", time: "10:15 AM", current: true },
      ],
      speed: 28,
      fuelLevel: 54,
      tasksCompleted: 6,
      tasksRemaining: 3,
      efficiency: 91,
    },
  ];

  // Activity timeline
  const timeline = [
    { time: "12:34 PM", vehicle: "TRK-001", event: "Task completed at Bandra", type: "success" },
    { time: "12:28 PM", vehicle: "TRK-002", event: "En route to Andheri East", type: "info" },
    { time: "12:15 PM", vehicle: "TRK-003", event: "Returned to depot", type: "success" },
    { time: "12:05 PM", vehicle: "TRK-001", event: "Started waste collection", type: "info" },
    { time: "11:58 AM", vehicle: "TRK-004", event: "Fuel level low warning", type: "warning" },
    { time: "11:45 AM", vehicle: "TRK-002", event: "Task completed at Juhu", type: "success" },
    { time: "11:30 AM", vehicle: "TRK-001", event: "Diverted to emergency incident", type: "warning" },
    { time: "11:15 AM", vehicle: "TRK-004", event: "Started route optimization", type: "info" },
  ];

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "collecting":
        return "bg-blue-500";
      case "in_transit":
        return "bg-green-500";
      case "idle":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "collecting":
        return <Badge className="bg-blue-500">Collecting</Badge>;
      case "in_transit":
        return <Badge className="bg-green-500">In Transit</Badge>;
      case "idle":
        return <Badge variant="secondary">Idle</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Radio className="h-8 w-8 text-blue-600 animate-pulse" />
              Live Operations Monitor
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time fleet tracking, worker monitoring, and route optimization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 animate-pulse">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <span className="text-sm text-muted-foreground">
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Fleet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {vehicles.filter((v) => v.status !== "idle").length}/{vehicles.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Currently deployed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Workers on Field</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {vehicles.reduce((sum, v) => sum + v.crew.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total crew members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {vehicles.reduce((sum, v) => sum + v.tasksCompleted, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Completed successfully</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {Math.round(vehicles.reduce((sum, v) => sum + v.efficiency, 0) / vehicles.length)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5% vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {vehicles.reduce((sum, v) => sum + v.tasksRemaining, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Queued for completion</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Live Fleet Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden border">
                <MapContainer
                  center={[19.076, 72.877]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Vehicle markers and routes */}
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id}>
                      {/* Vehicle current position */}
                      <Marker position={[vehicle.location.lat, vehicle.location.lng]}>
                        <Popup>
                          <div className="p-2">
                            <p className="font-bold">{vehicle.name}</p>
                            <p className="text-xs">{getStatusBadge(vehicle.status)}</p>
                            <p className="text-xs mt-1">{vehicle.location.address}</p>
                            <p className="text-xs">Speed: {vehicle.speed} km/h</p>
                            <p className="text-xs">Fuel: {vehicle.fuelLevel}%</p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Route line */}
                      {vehicle.route.length > 0 && (
                        <Polyline
                          positions={vehicle.route.map((r) => [r.lat, r.lng])}
                          pathOptions={{
                            color: vehicle.id === selectedVehicle ? "#3b82f6" : "#94a3b8",
                            weight: vehicle.id === selectedVehicle ? 4 : 2,
                            opacity: vehicle.id === selectedVehicle ? 0.8 : 0.5,
                          }}
                        />
                      )}

                      {/* Route waypoints */}
                      {vehicle.route.map((waypoint, idx) => (
                        <Marker
                          key={idx}
                          position={[waypoint.lat, waypoint.lng]}
                          icon={L.divIcon({
                            className: "custom-marker",
                            html: `<div class="flex items-center justify-center w-6 h-6 rounded-full ${
                              waypoint.current ? "bg-green-500" : "bg-blue-500"
                            } text-white text-xs font-bold border-2 border-white shadow-lg">${idx + 1}</div>`,
                          })}
                        >
                          <Popup>
                            <div className="p-2">
                              <p className="font-bold text-xs">{waypoint.incident}</p>
                              <p className="text-xs">ETA: {waypoint.time}</p>
                              {waypoint.current && (
                                <Badge className="mt-1 bg-green-500 text-xs">Current Location</Badge>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </div>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Vehicle Details */}
            {selectedVehicleData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    {selectedVehicleData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusBadge(selectedVehicleData.status)}
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Current Location
                    </p>
                    <p className="text-sm font-medium">{selectedVehicleData.location.address}</p>
                  </div>

                  {/* Speed & Fuel */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        Speed
                      </p>
                      <p className="text-2xl font-bold">{selectedVehicleData.speed}</p>
                      <p className="text-xs text-muted-foreground">km/h</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Fuel className="h-3 w-3" />
                        Fuel
                      </p>
                      <p className="text-2xl font-bold">{selectedVehicleData.fuelLevel}%</p>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            selectedVehicleData.fuelLevel > 50 ? "bg-green-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${selectedVehicleData.fuelLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Task Progress</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-semibold">
                        ✓ {selectedVehicleData.tasksCompleted} Completed
                      </span>
                      <span className="text-amber-600 font-semibold">
                        {selectedVehicleData.tasksRemaining} Pending
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${
                            (selectedVehicleData.tasksCompleted /
                              (selectedVehicleData.tasksCompleted + selectedVehicleData.tasksRemaining)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Efficiency */}
                  <div className="space-y-1 p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Efficiency Score</p>
                    <p className="text-3xl font-bold text-primary">{selectedVehicleData.efficiency}%</p>
                  </div>

                  {/* Crew */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Crew Members ({selectedVehicleData.crew.length})
                    </p>
                    {selectedVehicleData.crew.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{member}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
                      <div className="flex-shrink-0 w-12 text-xs text-muted-foreground">{item.time}</div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 w-2 h-2 rounded-full ${
                              item.type === "success"
                                ? "bg-green-500"
                                : item.type === "warning"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.event}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.vehicle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fleet List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              Fleet Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedVehicle === vehicle.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status)} animate-pulse`} />
                      <h3 className="font-semibold text-sm">{vehicle.name}</h3>
                    </div>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Crew</span>
                      <span className="font-semibold">{vehicle.crew.length} workers</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="font-semibold">{vehicle.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-semibold text-green-600">{vehicle.efficiency}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tasks</span>
                      <span className="font-semibold">
                        {vehicle.tasksCompleted}/{vehicle.tasksCompleted + vehicle.tasksRemaining}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
