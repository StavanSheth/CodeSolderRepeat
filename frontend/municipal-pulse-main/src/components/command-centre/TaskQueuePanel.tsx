import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCommandCentreStore } from '@/stores/commandCentreStore';
import { getSeverityColor } from '@/services/commandCentreService';

export function TaskQueuePanel() {
  const {
    getSortedWorkItems,
    selectedWorkItemId,
    setSelectedWorkItemId,
  } = useCommandCentreStore();

  const sortedItems = getSortedWorkItems();

  return (
    <Card className="flex-1 overflow-hidden flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">📋 Task Queue (PIA-Sorted)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-2 pr-2">
        {sortedItems.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">
            No tasks yet. Upload an image to start.
          </p>
        ) : (
          sortedItems.map((item) => {
            const colors = getSeverityColor(item.pia);
            return (
              <button
                key={item.id}
                onClick={() => setSelectedWorkItemId(item.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedWorkItemId === item.id
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.incident.classification.wasteType}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.incident.location.address}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${colors.badge}`}>
                    {item.pia}
                  </span>
                </div>
                <div className="flex gap-1 mt-2">
                  {item.status === 'new' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                  {item.status === 'planned' && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      Planned
                    </span>
                  )}
                  {item.status === 'dispatched' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Dispatched
                    </span>
                  )}
                  {item.solutions && (
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                      {item.solutions.length} solutions
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
