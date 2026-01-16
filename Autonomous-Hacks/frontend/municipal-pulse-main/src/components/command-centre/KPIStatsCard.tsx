import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { useCommandCentreStore } from '@/stores/commandCentreStore';

export function KPIStatsCard() {
  const { getStats, getSortedWorkItems } = useCommandCentreStore();
  const stats = getStats();
  const tasks = getSortedWorkItems();

  const criticalCount = tasks.filter((t) => (t.pia || 0) >= 80).length;
  const avgPia = stats.avgPIA;

  const statCards = [
    {
      label: 'Active Tasks',
      value: stats.totalCount,
      icon: AlertCircle,
      color: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Dispatched',
      value: stats.dispatchedCount,
      icon: CheckCircle2,
      color: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: 'Critical Priority',
      value: criticalCount,
      icon: TrendingUp,
      color: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      label: 'Avg PIA Score',
      value: Math.round(avgPia),
      icon: Zap,
      color: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className={stat.color}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</p>
                </div>
                <Icon className={`h-5 w-5 ${stat.textColor} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
