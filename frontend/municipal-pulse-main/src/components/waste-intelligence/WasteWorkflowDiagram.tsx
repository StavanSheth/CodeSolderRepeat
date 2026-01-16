import { useEffect, useState } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Position,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { WasteCategory, TimeFilter } from '@/data/wasteWorkflowData';
import { Badge } from '@/components/ui/badge';
import { Leaf, Users, CheckCircle2, ArrowDown } from 'lucide-react';

interface WasteWorkflowDiagramProps {
  category: WasteCategory;
  timeFilter: TimeFilter;
}

// Custom Start Node
function StartNode({ data }: NodeProps) {
  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      medium: 'bg-amber-100 text-amber-700 border-amber-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      critical: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[severity] || colors.low;
  };

  return (
    <div 
      className={`px-6 py-5 rounded-xl border-2 shadow-lg min-w-[320px] transition-all duration-500 ${
        data.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      style={{ 
        backgroundColor: data.bgColor,
        borderColor: data.borderColor,
        transitionDelay: `${data.delay}ms`,
      }}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: data.borderColor }}>
        <span className="text-3xl">{data.icon}</span>
        <h3 className="font-bold text-xl" style={{ color: data.color }}>{data.name}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Quantity</p>
          <p className="text-lg font-bold text-foreground">{data.quantity.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">TPD</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Severity</p>
          <Badge variant="outline" className={`capitalize ${getSeverityColor(data.severity)}`}>
            {data.severity}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Score</p>
          <p className="text-lg font-bold text-foreground">{data.segregationScore}%</p>
        </div>
      </div>
    </div>
  );
}

// Custom Action Node
function ActionNode({ data }: NodeProps) {
  return (
    <div 
      className={`px-5 py-4 bg-card border-2 border-border rounded-xl shadow-md min-w-[320px] transition-all duration-500 ${
        data.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      style={{ transitionDelay: `${data.delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="flex items-center justify-center w-10 h-10 rounded-full text-base font-bold text-white shrink-0 shadow-sm"
          style={{ backgroundColor: data.nodeColor }}
        >
          {data.stepNumber}
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="font-semibold text-foreground text-base">{data.title}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{data.description}</p>
          </div>
          
          <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Leaf className="w-3 h-3 text-emerald-600" />
              </div>
              <span className="text-xs text-emerald-700 font-medium leading-relaxed">{data.ecoBenefit}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Users className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{data.responsibleTeam}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Connector Node (arrow between nodes)
function ConnectorNode({ data }: NodeProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center transition-all duration-300 ${
        data.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{ transitionDelay: `${data.delay}ms` }}
    >
      {/* Vertical line */}
      <div 
        className="w-0.5 h-8"
        style={{ backgroundColor: data.color }}
      />
      {/* Arrow circle */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center border-2"
        style={{ 
          backgroundColor: data.color + '15',
          borderColor: data.color,
        }}
      >
        <ArrowDown className="w-5 h-5" style={{ color: data.color }} />
      </div>
      {/* Vertical line */}
      <div 
        className="w-0.5 h-8"
        style={{ backgroundColor: data.color }}
      />
    </div>
  );
}

// Custom Solution Node
function SolutionNode({ data }: NodeProps) {
  return (
    <div 
      className={`px-6 py-5 rounded-xl border-2 shadow-lg min-w-[320px] transition-all duration-500 ${
        data.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      style={{ 
        backgroundColor: data.bgColor,
        borderColor: data.borderColor,
        transitionDelay: `${data.delay}ms`,
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: data.borderColor }}>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: data.color + '20' }}
        >
          <CheckCircle2 className="w-5 h-5" style={{ color: data.color }} />
        </div>
        <h3 className="font-bold text-base" style={{ color: data.color }}>
          Recommended Solutions
        </h3>
      </div>
      
      <ul className="space-y-2">
        {data.solutions.map((solution: string, index: number) => (
          <li 
            key={index} 
            className={`flex items-start gap-3 text-sm transition-all duration-300 ${
              data.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ transitionDelay: `${data.delay + (index + 1) * 100}ms` }}
          >
            <span 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
              style={{ backgroundColor: data.color }}
            >
              {index + 1}
            </span>
            <p className="text-foreground pt-0.5">{solution}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nodeTypes = {
  startNode: StartNode,
  actionNode: ActionNode,
  connectorNode: ConnectorNode,
  solutionNode: SolutionNode,
};

export function WasteWorkflowDiagram({ category, timeFilter }: WasteWorkflowDiagramProps) {
  const [isVisible, setIsVisible] = useState(false);
  const data = category.data[timeFilter];
  
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [category.id, timeFilter]);

  const nodeSpacing = 180;
  const connectorHeight = 80;
  
  // Build nodes
  const nodes: Node[] = [
    {
      id: 'start',
      type: 'startNode',
      position: { x: 0, y: 0 },
      data: {
        name: category.name,
        icon: category.icon,
        quantity: data.quantity,
        severity: data.severity,
        segregationScore: data.segregationScore,
        color: category.color,
        bgColor: category.bgColor,
        borderColor: category.borderColor,
        isVisible,
        delay: 0,
      },
      sourcePosition: Position.Bottom,
      draggable: false,
    },
  ];

  let currentY = 160;
  let nodeIndex = 1;

  // Add action nodes with connectors
  category.workflow.forEach((step, index) => {
    // Add connector
    nodes.push({
      id: `connector-${index}`,
      type: 'connectorNode',
      position: { x: 146, y: currentY },
      data: {
        color: category.color,
        isVisible,
        delay: nodeIndex * 100,
      },
      draggable: false,
    });
    
    currentY += connectorHeight;
    nodeIndex++;

    // Add action node
    nodes.push({
      id: `action-${index}`,
      type: 'actionNode',
      position: { x: 0, y: currentY },
      data: {
        ...step,
        nodeColor: category.color,
        isVisible,
        delay: nodeIndex * 100,
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: false,
    });
    
    currentY += nodeSpacing;
    nodeIndex++;
  });

  // Add final connector before solutions
  nodes.push({
    id: 'connector-final',
    type: 'connectorNode',
    position: { x: 146, y: currentY },
    data: {
      color: category.color,
      isVisible,
      delay: nodeIndex * 100,
    },
    draggable: false,
  });
  
  currentY += connectorHeight;
  nodeIndex++;

  // Add solution node
  nodes.push({
    id: 'solutions',
    type: 'solutionNode',
    position: { x: 0, y: currentY },
    data: {
      solutions: category.solutions,
      color: category.color,
      bgColor: category.bgColor,
      borderColor: category.borderColor,
      isVisible,
      delay: nodeIndex * 100,
    },
    targetPosition: Position.Top,
    draggable: false,
  });

  const flowHeight = currentY + 280;

  // No edges needed - we use connector nodes instead for cleaner look
  const edges: Edge[] = [];

  return (
    <div style={{ height: flowHeight, width: '100%' }} className="bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <style>{`
          .reactflow__viewport {
            background: transparent !important;
          }
          .reactflow__renderer {
            background: transparent !important;
          }
          .reactflow {
            background: transparent !important;
          }
        `}</style>
      </ReactFlow>
    </div>
  );
}
