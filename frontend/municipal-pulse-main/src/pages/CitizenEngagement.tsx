import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Camera, 
  TrendingUp, 
  Users, 
  Award,
  Star,
  MapPin,
  Zap,
  Heart,
  Gift,
  Medal,
  Crown,
  Target
} from "lucide-react";

export default function CitizenEngagement() {
  // Mock leaderboard data
  const topReporters = [
    { rank: 1, name: "Priya Sharma", reports: 142, points: 7100, avatar: "PS", impact: "3.2 tons diverted", badge: "Diamond" },
    { rank: 2, name: "Rajesh Kumar", reports: 128, points: 6400, avatar: "RK", impact: "2.8 tons diverted", badge: "Platinum" },
    { rank: 3, name: "Anjali Patel", reports: 115, points: 5750, avatar: "AP", impact: "2.5 tons diverted", badge: "Gold" },
    { rank: 4, name: "Vikram Singh", reports: 98, points: 4900, avatar: "VS", impact: "2.1 tons diverted", badge: "Gold" },
    { rank: 5, name: "Sneha Desai", reports: 87, points: 4350, avatar: "SD", impact: "1.9 tons diverted", badge: "Silver" },
  ];

  const recentReports = [
    { id: 1, user: "Amit K.", location: "Bandra West", type: "Plastic", time: "2 min ago", status: "verified", points: 50 },
    { id: 2, user: "Pooja R.", location: "Andheri East", type: "E-Waste", time: "15 min ago", status: "verified", points: 100 },
    { id: 3, user: "Rohit M.", location: "Powai", type: "Organic", time: "23 min ago", status: "pending", points: 30 },
    { id: 4, user: "Kavita S.", location: "Juhu", type: "Mixed", time: "1 hr ago", status: "resolved", points: 75 },
  ];

  const achievements = [
    { icon: Camera, title: "First Report", desc: "Submit your first waste report", unlocked: true, points: 100 },
    { icon: Target, title: "Sharpshooter", desc: "10 verified reports", unlocked: true, points: 500 },
    { icon: Award, title: "Eco Warrior", desc: "25 reports in a month", unlocked: true, points: 1000 },
    { icon: Crown, title: "Community Leader", desc: "50 total reports", unlocked: false, points: 2500 },
    { icon: Star, title: "Legend", desc: "100 verified reports", unlocked: false, points: 5000 },
  ];

  const rewards = [
    { title: "₹500 Swiggy Voucher", points: 5000, stock: 12, category: "Food & Dining" },
    { title: "₹1000 Amazon Gift Card", points: 10000, stock: 8, category: "Shopping" },
    { title: "Eco-Friendly Kit", points: 2000, stock: 25, category: "Sustainability" },
    { title: "Movie Tickets (2x)", points: 3000, stock: 15, category: "Entertainment" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Citizen Engagement Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Empowering citizens to create cleaner, greener cities
            </p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Camera className="h-5 w-5 mr-2" />
            Report Waste Now
          </Button>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-100">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24,847</div>
              <p className="text-xs text-blue-100 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-100">Active Citizens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,432</div>
              <p className="text-xs text-green-100 mt-1 flex items-center gap-1">
                <Users className="h-3 w-3" />
                Contributing daily
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-100">Waste Diverted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">342 tons</div>
              <p className="text-xs text-purple-100 mt-1 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                From landfills
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-amber-100">Points Awarded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.2M</div>
              <p className="text-xs text-amber-100 mt-1 flex items-center gap-1">
                <Gift className="h-3 w-3" />
                Redeemable rewards
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Contributors - This Month
                  </CardTitle>
                  <Badge variant="secondary">Live Rankings</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topReporters.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      user.rank === 1 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300" :
                      user.rank === 2 ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300" :
                      user.rank === 3 ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300" :
                      "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        user.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                        user.rank === 2 ? "bg-gray-400 text-gray-900" :
                        user.rank === 3 ? "bg-orange-400 text-orange-900" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {user.rank === 1 ? <Crown className="h-6 w-6" /> :
                         user.rank === 2 ? <Medal className="h-6 w-6" /> :
                         user.rank === 3 ? <Award className="h-6 w-6" /> :
                         user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{user.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {user.reports} reports
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-green-600" />
                            {user.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{user.points.toLocaleString()}</div>
                      <Badge variant="outline" className="mt-1">{user.badge}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{report.user} reported {report.type}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3" />
                          {report.location} • {report.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        report.status === "verified" ? "default" :
                        report.status === "resolved" ? "secondary" :
                        "outline"
                      }>
                        {report.status}
                      </Badge>
                      <p className="text-sm font-semibold text-green-600 mt-1">+{report.points} pts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      achievement.unlocked ? "bg-green-50 border border-green-200" : "bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? "bg-green-500 text-white" : "bg-muted"
                    }`}>
                      <achievement.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{achievement.desc}</p>
                      <p className="text-xs font-semibold text-green-600 mt-1">+{achievement.points} pts</p>
                    </div>
                    {achievement.unlocked && (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-500" />
                  Redeem Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rewards.map((reward, idx) => (
                  <div key={idx} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{reward.title}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{reward.category}</Badge>
                      </div>
                      <Badge variant="secondary" className="text-xs">{reward.stock} left</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-primary">{reward.points.toLocaleString()} pts</span>
                      <Button size="sm" variant="outline">Redeem</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>How It Works - Join the Movement! 🌱</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Spot Waste</h3>
                <p className="text-sm text-muted-foreground">Find waste issues in your neighborhood</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Report & Photo</h3>
                <p className="text-sm text-muted-foreground">Snap a picture and submit via app</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Earn Points</h3>
                <p className="text-sm text-muted-foreground">Get verified and collect reward points</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Redeem Rewards</h3>
                <p className="text-sm text-muted-foreground">Exchange points for exciting prizes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
