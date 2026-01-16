import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  TrendingDown, 
  Droplet, 
  TreePine,
  Factory,
  Recycle,
  TrendingUp,
  Target,
  Globe,
  Award,
  BarChart3,
  ArrowUpRight
} from "lucide-react";

export default function ImpactMetrics() {
  const cityMetrics = [
    { city: "Mumbai", wasteProcessed: 8234, carbonSaved: 4521, score: 92, trend: "+8%" },
    { city: "Delhi", wasteProcessed: 7845, carbonSaved: 4123, score: 88, trend: "+12%" },
    { city: "Ahmedabad", wasteProcessed: 6543, carbonSaved: 3654, score: 85, trend: "+6%" },
    { city: "Ahmedabad", wasteProcessed: 5234, carbonSaved: 2987, score: 83, trend: "+10%" },
  ];

  const monthlyImpact = [
    { month: "Jan", waste: 42, carbon: 23, water: 1200 },
    { month: "Feb", waste: 48, carbon: 26, water: 1350 },
    { month: "Mar", waste: 55, carbon: 30, water: 1500 },
    { month: "Apr", waste: 62, carbon: 34, water: 1680 },
    { month: "May", waste: 71, carbon: 39, water: 1890 },
    { month: "Jun", waste: 78, carbon: 43, water: 2100 },
  ];

  const sdgGoals = [
    { number: 11, title: "Sustainable Cities", progress: 87, color: "bg-orange-500" },
    { number: 12, title: "Responsible Consumption", progress: 92, color: "bg-amber-500" },
    { number: 13, title: "Climate Action", progress: 85, color: "bg-green-600" },
    { number: 14, title: "Life Below Water", progress: 78, color: "bg-blue-500" },
    { number: 15, title: "Life on Land", progress: 81, color: "bg-green-500" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Globe className="h-8 w-8 text-green-600" />
              Environmental Impact Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time sustainability metrics and ESG performance indicators
            </p>
          </div>
          <Badge className="bg-green-600 text-white px-4 py-2 text-base">
            <Award className="h-4 w-4 mr-2" />
            ESG Score: 89/100
          </Badge>
        </div>

        {/* Key Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Carbon Offset (MTons)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">234.5</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +23% vs last quarter
              </p>
              <div className="mt-3 h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                Water Saved (Million L)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12.8</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                +18% vs last quarter
              </p>
              <div className="mt-3 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Landfill Diversion (%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">67.3%</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-amber-600" />
                +9% improvement
              </p>
              <div className="mt-3 h-2 bg-amber-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "67%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Recycle className="h-4 w-4" />
                Materials Recovered (Tons)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">1,847</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                +31% vs last quarter
              </p>
              <div className="mt-3 h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Multi-City Impact */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Multi-City Performance Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cityMetrics.map((city) => (
                  <div key={city.city} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{city.city}</h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {city.trend}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{city.score}</div>
                          <p className="text-xs text-muted-foreground">ESG Score</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Recycle className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-semibold">{city.wasteProcessed.toLocaleString()} tons</p>
                          <p className="text-xs text-muted-foreground">Waste Processed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-semibold">{city.carbonSaved.toLocaleString()} kg</p>
                          <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  6-Month Impact Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyImpact.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-semibold text-muted-foreground">{month.month}</div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Recycle className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-muted-foreground">Waste</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${(month.waste / 80) * 100}%` }} 
                            />
                          </div>
                          <p className="text-xs font-semibold mt-1">{month.waste} tons</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-muted-foreground">Carbon</span>
                          </div>
                          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${(month.carbon / 50) * 100}%` }} 
                            />
                          </div>
                          <p className="text-xs font-semibold mt-1">{month.carbon} MTons</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Droplet className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-muted-foreground">Water</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${(month.water / 2500) * 100}%` }} 
                            />
                          </div>
                          <p className="text-xs font-semibold mt-1">{month.water}L</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* UN SDG Alignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-5 w-5 text-blue-600" />
                  UN SDG Alignment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sdgGoals.map((goal) => (
                  <div key={goal.number} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${goal.color} text-white rounded-md flex items-center justify-center text-xs font-bold`}>
                          {goal.number}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{goal.title}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${goal.color} rounded-full transition-all`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Environmental Milestones */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-600" />
                  Environmental Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500 text-white rounded-full">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-green-900">Carbon Neutral City</p>
                    <p className="text-xs text-green-700 mt-1">Offset 234.5 MTons CO₂ this quarter</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500 text-white rounded-full">
                    <Droplet className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-blue-900">Water Conservation</p>
                    <p className="text-xs text-blue-700 mt-1">12.8M liters saved through waste processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500 text-white rounded-full">
                    <Recycle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-purple-900">Circular Economy</p>
                    <p className="text-xs text-purple-700 mt-1">67% waste diverted from landfills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-amber-600" />
                    <p className="font-semibold text-sm">ISO 14001 Certified</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Environmental Management System</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TreePine className="h-4 w-4 text-green-600" />
                    <p className="font-semibold text-sm">Green City Award 2025</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Sustainable Urban Development</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <p className="font-semibold text-sm">UN Habitat Recognition</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Best Waste Management Innovation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">2.4M</div>
                <p className="text-sm text-muted-foreground">Trees Equivalent Planted</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
                <p className="text-sm text-muted-foreground">Overall ESG Score</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
                <p className="text-sm text-muted-foreground">Cities Connected</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">247</div>
                <p className="text-sm text-muted-foreground">Compliance Checkpoints</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-1">₹42M</div>
                <p className="text-sm text-muted-foreground">Value Recovered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
