export interface WasteCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  data: {
    daily: { quantity: number; severity: 'low' | 'medium' | 'high' | 'critical'; segregationScore: number };
    weekly: { quantity: number; severity: 'low' | 'medium' | 'high' | 'critical'; segregationScore: number };
    monthly: { quantity: number; severity: 'low' | 'medium' | 'high' | 'critical'; segregationScore: number };
  };
  workflow: WorkflowStep[];
  solutions: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  ecoBenefit: string;
  responsibleTeam: string;
}

export const wasteCategories: WasteCategory[] = [
  {
    id: 'organic',
    name: 'Organic Waste',
    icon: '🥬',
    color: 'hsl(142, 45%, 35%)',
    bgColor: 'hsl(142, 45%, 95%)',
    borderColor: 'hsl(142, 45%, 75%)',
    data: {
      daily: { quantity: 1250, severity: 'medium', segregationScore: 78 },
      weekly: { quantity: 8750, severity: 'medium', segregationScore: 76 },
      monthly: { quantity: 37500, severity: 'high', segregationScore: 74 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Source Segregation',
        description: 'Collect organic waste separately from households',
        ecoBenefit: 'Prevents contamination of recyclables',
        responsibleTeam: 'Ward Collection Team',
      },
      {
        stepNumber: 2,
        title: 'Primary Processing',
        description: 'Remove non-organic contaminants at MRF',
        ecoBenefit: 'Improves compost quality by 40%',
        responsibleTeam: 'MRF Operations',
      },
      {
        stepNumber: 3,
        title: 'Composting',
        description: 'Process in windrow or vermi-composting units',
        ecoBenefit: 'Reduces landfill load by 35%',
        responsibleTeam: 'Composting Unit',
      },
      {
        stepNumber: 4,
        title: 'Quality Testing',
        description: 'Test compost for NPK values and contaminants',
        ecoBenefit: 'Ensures safe agricultural use',
        responsibleTeam: 'Quality Control Lab',
      },
    ],
    solutions: [
      'Increase household awareness on wet waste segregation',
      'Deploy more community composting units in high-density wards',
      'Partner with urban farms for compost offtake',
    ],
  },
  {
    id: 'plastic',
    name: 'Plastic Waste',
    icon: '🧴',
    color: 'hsl(210, 55%, 45%)',
    bgColor: 'hsl(210, 55%, 95%)',
    borderColor: 'hsl(210, 55%, 75%)',
    data: {
      daily: { quantity: 420, severity: 'high', segregationScore: 62 },
      weekly: { quantity: 2940, severity: 'high', segregationScore: 60 },
      monthly: { quantity: 12600, severity: 'critical', segregationScore: 58 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Collection & Sorting',
        description: 'Separate by plastic type (PET, HDPE, LDPE, PP)',
        ecoBenefit: 'Enables targeted recycling pathways',
        responsibleTeam: 'MRF Sorting Team',
      },
      {
        stepNumber: 2,
        title: 'Cleaning & Shredding',
        description: 'Wash and shred plastics for processing',
        ecoBenefit: 'Reduces virgin plastic demand by 60%',
        responsibleTeam: 'Recycling Unit',
      },
      {
        stepNumber: 3,
        title: 'Recycling / Co-processing',
        description: 'Send to recyclers or cement kilns for RDF',
        ecoBenefit: 'Diverts plastic from landfills and oceans',
        responsibleTeam: 'External Partners',
      },
    ],
    solutions: [
      'Ban single-use plastics in municipal events',
      'Incentivize plastic buyback programs at ward level',
      'Establish dedicated MLP (multi-layer plastic) collection drives',
    ],
  },
  {
    id: 'paper',
    name: 'Paper Waste',
    icon: '📄',
    color: 'hsl(220, 25%, 50%)',
    bgColor: 'hsl(220, 25%, 95%)',
    borderColor: 'hsl(220, 25%, 75%)',
    data: {
      daily: { quantity: 380, severity: 'low', segregationScore: 85 },
      weekly: { quantity: 2660, severity: 'low', segregationScore: 84 },
      monthly: { quantity: 11400, severity: 'medium', segregationScore: 82 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Dry Waste Collection',
        description: 'Collect paper with dry recyclables',
        ecoBenefit: 'Saves 17 trees per ton recycled',
        responsibleTeam: 'Dry Waste Collectors',
      },
      {
        stepNumber: 2,
        title: 'Sorting by Grade',
        description: 'Separate cardboard, office paper, newspaper',
        ecoBenefit: 'Maximizes recycling value',
        responsibleTeam: 'MRF Sorting Team',
      },
      {
        stepNumber: 3,
        title: 'Baling & Transport',
        description: 'Compress and send to paper mills',
        ecoBenefit: 'Reduces water usage by 70% vs virgin paper',
        responsibleTeam: 'Logistics Team',
      },
    ],
    solutions: [
      'Promote digital documentation in municipal offices',
      'Partner with schools for paper recycling awareness',
      'Establish paper bank collection points in commercial zones',
    ],
  },
  {
    id: 'glass',
    name: 'Glass Waste',
    icon: '🫙',
    color: 'hsl(180, 35%, 45%)',
    bgColor: 'hsl(180, 35%, 95%)',
    borderColor: 'hsl(180, 35%, 75%)',
    data: {
      daily: { quantity: 85, severity: 'low', segregationScore: 72 },
      weekly: { quantity: 595, severity: 'low', segregationScore: 70 },
      monthly: { quantity: 2550, severity: 'low', segregationScore: 68 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Safe Collection',
        description: 'Collect glass separately to prevent breakage injuries',
        ecoBenefit: 'Ensures worker safety',
        responsibleTeam: 'Specialized Glass Collectors',
      },
      {
        stepNumber: 2,
        title: 'Color Sorting',
        description: 'Separate clear, green, and brown glass',
        ecoBenefit: 'Improves recycled glass quality',
        responsibleTeam: 'MRF Sorting Team',
      },
      {
        stepNumber: 3,
        title: 'Crushing & Recycling',
        description: 'Crush into cullet for glass manufacturers',
        ecoBenefit: 'Glass is 100% recyclable infinitely',
        responsibleTeam: 'Recycling Partners',
      },
    ],
    solutions: [
      'Install glass-specific collection bins at restaurants and bars',
      'Partner with bottle manufacturers for closed-loop recycling',
      'Conduct quarterly glass collection drives in residential areas',
    ],
  },
  {
    id: 'metal',
    name: 'Metal Waste',
    icon: '🥫',
    color: 'hsl(240, 20%, 50%)',
    bgColor: 'hsl(240, 20%, 95%)',
    borderColor: 'hsl(240, 20%, 75%)',
    data: {
      daily: { quantity: 120, severity: 'low', segregationScore: 88 },
      weekly: { quantity: 840, severity: 'low', segregationScore: 87 },
      monthly: { quantity: 3600, severity: 'low', segregationScore: 85 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Collection',
        description: 'Collect metal cans, scrap from households and industries',
        ecoBenefit: 'High value recyclable material',
        responsibleTeam: 'Scrap Collectors',
      },
      {
        stepNumber: 2,
        title: 'Magnet Separation',
        description: 'Separate ferrous from non-ferrous metals',
        ecoBenefit: 'Enables targeted metal recycling',
        responsibleTeam: 'MRF Operations',
      },
      {
        stepNumber: 3,
        title: 'Smelting & Reuse',
        description: 'Send to foundries for melting and remanufacturing',
        ecoBenefit: 'Saves 95% energy vs virgin aluminum',
        responsibleTeam: 'Metal Recyclers',
      },
    ],
    solutions: [
      'Strengthen informal scrap collector integration',
      'Establish metal buyback centers in industrial zones',
      'Track metal waste from construction demolition sites',
    ],
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    icon: '📱',
    color: 'hsl(280, 40%, 45%)',
    bgColor: 'hsl(280, 40%, 95%)',
    borderColor: 'hsl(280, 40%, 75%)',
    data: {
      daily: { quantity: 45, severity: 'high', segregationScore: 55 },
      weekly: { quantity: 315, severity: 'high', segregationScore: 52 },
      monthly: { quantity: 1350, severity: 'critical', segregationScore: 48 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Designated Collection',
        description: 'Collect at authorized e-waste collection points',
        ecoBenefit: 'Prevents toxic leaching into soil',
        responsibleTeam: 'E-Waste Collection Team',
      },
      {
        stepNumber: 2,
        title: 'Component Dismantling',
        description: 'Safely dismantle and categorize components',
        ecoBenefit: 'Recovers precious metals safely',
        responsibleTeam: 'Authorized Dismantlers',
      },
      {
        stepNumber: 3,
        title: 'Certified Recycling',
        description: 'Process through CPCB-authorized recyclers',
        ecoBenefit: 'Ensures regulatory compliance',
        responsibleTeam: 'Certified E-Waste Recyclers',
      },
      {
        stepNumber: 4,
        title: 'Hazardous Material Disposal',
        description: 'Safely dispose batteries, CRTs, and circuit boards',
        ecoBenefit: 'Prevents mercury and lead contamination',
        responsibleTeam: 'TSDF Facility',
      },
    ],
    solutions: [
      'Mandate EPR compliance from electronics manufacturers',
      'Launch quarterly e-waste collection camps in each zone',
      'Partner with IT companies for refurbishment programs',
    ],
  },
  {
    id: 'hazardous',
    name: 'Hazardous Waste',
    icon: '⚠️',
    color: 'hsl(0, 55%, 45%)',
    bgColor: 'hsl(0, 55%, 95%)',
    borderColor: 'hsl(0, 55%, 75%)',
    data: {
      daily: { quantity: 28, severity: 'critical', segregationScore: 45 },
      weekly: { quantity: 196, severity: 'critical', segregationScore: 42 },
      monthly: { quantity: 840, severity: 'critical', segregationScore: 40 },
    },
    workflow: [
      {
        stepNumber: 1,
        title: 'Identification & Labeling',
        description: 'Identify hazardous waste types (medical, chemical, etc.)',
        ecoBenefit: 'Prevents cross-contamination',
        responsibleTeam: 'Hazardous Waste Team',
      },
      {
        stepNumber: 2,
        title: 'Secure Storage',
        description: 'Store in designated containment areas',
        ecoBenefit: 'Prevents environmental spills',
        responsibleTeam: 'Storage Facility Team',
      },
      {
        stepNumber: 3,
        title: 'Specialized Transport',
        description: 'Transport in approved vehicles to TSDF',
        ecoBenefit: 'Minimizes accident risks',
        responsibleTeam: 'Certified Transporters',
      },
      {
        stepNumber: 4,
        title: 'Treatment & Disposal',
        description: 'Incinerate or treat at authorized TSDF',
        ecoBenefit: 'Neutralizes harmful substances safely',
        responsibleTeam: 'TSDF Facility',
      },
    ],
    solutions: [
      'Increase biomedical waste collection frequency from hospitals',
      'Conduct industrial hazardous waste audits quarterly',
      'Establish household hazardous waste drop-off days',
    ],
  },
];

export type TimeFilter = 'daily' | 'weekly' | 'monthly';
