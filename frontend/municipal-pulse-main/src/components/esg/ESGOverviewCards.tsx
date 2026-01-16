import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Leaf, Coins } from "lucide-react";
import { esgSummary } from "@/data/esgData";

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString()}`;
};

export function ESGOverviewCards() {
  const cards = [
    {
      title: "Active Corporate Sponsors",
      value: esgSummary.activeSponsors,
      subtitle: `${formatCurrency(esgSummary.totalInvestment)} total investment`,
      icon: Building2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Zones Sponsored",
      value: esgSummary.sponsoredZones,
      subtitle: `Avg. ${esgSummary.averageCleanlinessImprovement}% cleanliness improvement`,
      icon: MapPin,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "Verified Waste Reduction",
      value: `${esgSummary.totalWasteReduction} tons`,
      subtitle: `${esgSummary.averageLandfillDiversion}% avg. landfill diversion`,
      icon: Leaf,
      iconBg: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "GreenCoins Issued",
      value: esgSummary.totalGreenCoins.toLocaleString(),
      subtitle: `${esgSummary.totalCarbonReduction.toFixed(1)} tons CO₂ offset`,
      icon: Coins,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
