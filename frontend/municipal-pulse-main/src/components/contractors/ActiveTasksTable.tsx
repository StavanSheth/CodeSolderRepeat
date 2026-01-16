import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, ArrowUpRight, RefreshCw } from "lucide-react";
import { contractorTasks, Contractor } from "@/data/contractorData";

interface ActiveTasksTableProps {
  contractor: Contractor;
}

export function ActiveTasksTable({ contractor }: ActiveTasksTableProps) {
  const tasks = contractorTasks.filter(t => t.contractorId === contractor.id);

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      'P1': 'bg-red-100 text-red-700 border-red-200',
      'P2': 'bg-amber-100 text-amber-700 border-amber-200',
      'P3': 'bg-blue-100 text-blue-700 border-blue-200',
      'P4': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return <Badge variant="outline" className={colors[priority] || ''}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'Assigned': 'bg-blue-50 text-blue-700 border-blue-200',
      'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
      'Completed': 'bg-green-50 text-green-700 border-green-200'
    };
    return <Badge variant="outline" className={colors[status] || ''}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            Active Tasks ({tasks.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <RefreshCw className="h-3 w-3 mr-1" />
              Reassign
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Escalate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-medium">Task ID</TableHead>
              <TableHead className="text-xs font-medium">Zone</TableHead>
              <TableHead className="text-xs font-medium text-center">Priority</TableHead>
              <TableHead className="text-xs font-medium text-center">Status</TableHead>
              <TableHead className="text-xs font-medium">ETA</TableHead>
              <TableHead className="text-xs font-medium text-center">Resources</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="py-2">
                  <span className="text-xs font-mono">{task.id}</span>
                </TableCell>
                <TableCell className="py-2">
                  <div>
                    <span className="text-xs font-medium">{task.zone}</span>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-center">
                  {getPriorityBadge(task.priority)}
                </TableCell>
                <TableCell className="py-2 text-center">
                  {getStatusBadge(task.status)}
                </TableCell>
                <TableCell className="py-2">
                  <span className="text-xs">{task.eta}</span>
                </TableCell>
                <TableCell className="py-2 text-center">
                  <span className="text-xs font-medium">{task.assignedResources}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
