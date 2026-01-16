export interface AreaData {
  id: string;
  name: string;
  ward: string;
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
  severity: "negligible" | "low" | "medium" | "high" | "critical";
  trend: "improving" | "stable" | "worsening";
  confidence: "high" | "medium" | "low";
  confidenceScore: number; // 0-100 for granular control
  reportCount: number;
  lastUpdated: string;
  manpower: {
    workersMin: number;
    workersMax: number;
    supervisorRequired: boolean;
    estimatedDuration: string;
    skillTypes: string[];
  };
  equipment: {
    vehicles: string[];
    tools: string[];
    specialEquipment: string[];
  };
  wasteTypes: {
    type: string;
    percentage: number;
  }[];
  history: {
    date: string;
    action: string;
    responseTime: string;
  }[];
  sampleImages?: string[];
}

export const areaData: AreaData[] = [
  {
    id: "area-1",
    name: "Rajwada Market Zone",
    ward: "Ward 1 - Central",
    center: { lat: 22.7196, lng: 75.8577 },
    bounds: { north: 22.7220, south: 22.7170, east: 75.8610, west: 75.8540 },
    severity: "critical",
    trend: "worsening",
    confidence: "high",
    confidenceScore: 92,
    reportCount: 47,
    lastUpdated: "10 mins ago",
    manpower: {
      workersMin: 12,
      workersMax: 15,
      supervisorRequired: true,
      estimatedDuration: "4-5 hours",
      skillTypes: ["Manual cleaners", "Machine operators", "Drain specialists"]
    },
    equipment: {
      vehicles: ["Compactor truck", "Tipper (2)", "Water tanker"],
      tools: ["Brooms", "Shovels", "Drain rods", "PPE kits"],
      specialEquipment: ["High-pressure washer", "Suction machine"]
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 45 },
      { type: "Organic", percentage: 30 },
      { type: "Plastic", percentage: 20 },
      { type: "Sludge", percentage: 5 }
    ],
    history: [
      { date: "Yesterday", action: "Full cleanup completed", responseTime: "2.5 hours" },
      { date: "3 days ago", action: "Drain cleaning", responseTime: "1.5 hours" }
    ],
    sampleImages: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
    ]
  },
  {
    id: "area-2",
    name: "Vijay Nagar Commercial",
    ward: "Ward 7 - West",
    center: { lat: 22.7533, lng: 75.8937 },
    bounds: { north: 22.7560, south: 22.7500, east: 75.8980, west: 75.8890 },
    severity: "high",
    trend: "stable",
    confidence: "high",
    confidenceScore: 88,
    reportCount: 28,
    lastUpdated: "25 mins ago",
    manpower: {
      workersMin: 8,
      workersMax: 10,
      supervisorRequired: true,
      estimatedDuration: "3-4 hours",
      skillTypes: ["Manual cleaners", "Machine operators"]
    },
    equipment: {
      vehicles: ["Compactor truck", "Tipper"],
      tools: ["Brooms", "Shovels", "PPE kits"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Plastic", percentage: 50 },
      { type: "Mixed waste", percentage: 35 },
      { type: "Organic", percentage: 15 }
    ],
    history: [
      { date: "Today 6 AM", action: "Morning sweep completed", responseTime: "1 hour" }
    ]
  },
  {
    id: "area-3",
    name: "Palasia Square",
    ward: "Ward 4 - Central",
    center: { lat: 22.7241, lng: 75.8839 },
    bounds: { north: 22.7270, south: 22.7210, east: 75.8880, west: 75.8800 },
    severity: "medium",
    trend: "improving",
    confidence: "medium",
    confidenceScore: 65,
    reportCount: 12,
    lastUpdated: "45 mins ago",
    manpower: {
      workersMin: 4,
      workersMax: 6,
      supervisorRequired: false,
      estimatedDuration: "2 hours",
      skillTypes: ["Manual cleaners"]
    },
    equipment: {
      vehicles: ["Tipper"],
      tools: ["Brooms", "Shovels"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 60 },
      { type: "Organic", percentage: 40 }
    ],
    history: [
      { date: "Yesterday", action: "Routine cleanup", responseTime: "45 mins" }
    ]
  },
  {
    id: "area-4",
    name: "Sarafa Bazaar",
    ward: "Ward 2 - Central",
    center: { lat: 22.7180, lng: 75.8560 },
    bounds: { north: 22.7200, south: 22.7160, east: 75.8590, west: 75.8530 },
    severity: "high",
    trend: "worsening",
    confidence: "high",
    confidenceScore: 85,
    reportCount: 31,
    lastUpdated: "15 mins ago",
    manpower: {
      workersMin: 10,
      workersMax: 12,
      supervisorRequired: true,
      estimatedDuration: "3-4 hours",
      skillTypes: ["Manual cleaners", "Night shift workers"]
    },
    equipment: {
      vehicles: ["Compactor truck", "Small pickup (2)"],
      tools: ["Brooms", "Dustpans", "PPE kits"],
      specialEquipment: ["Street washing unit"]
    },
    wasteTypes: [
      { type: "Organic", percentage: 55 },
      { type: "Mixed waste", percentage: 30 },
      { type: "Plastic", percentage: 15 }
    ],
    history: [
      { date: "Today 11 PM", action: "Night cleaning scheduled", responseTime: "-" }
    ]
  },
  {
    id: "area-5",
    name: "MR-10 Highway Stretch",
    ward: "Ward 12 - Outer",
    center: { lat: 22.6850, lng: 75.8200 },
    bounds: { north: 22.6900, south: 22.6800, east: 75.8280, west: 75.8120 },
    severity: "medium",
    trend: "stable",
    confidence: "medium",
    confidenceScore: 58,
    reportCount: 8,
    lastUpdated: "1 hour ago",
    manpower: {
      workersMin: 5,
      workersMax: 7,
      supervisorRequired: false,
      estimatedDuration: "2-3 hours",
      skillTypes: ["Manual cleaners", "Machine operators"]
    },
    equipment: {
      vehicles: ["JCB", "Tipper (2)"],
      tools: ["Shovels", "PPE kits"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "C&D debris", percentage: 70 },
      { type: "Mixed waste", percentage: 30 }
    ],
    history: []
  },
  {
    id: "area-6",
    name: "Scheme 78 Residential",
    ward: "Ward 9 - West",
    center: { lat: 22.7450, lng: 75.9100 },
    bounds: { north: 22.7490, south: 22.7410, east: 75.9150, west: 75.9050 },
    severity: "low",
    trend: "improving",
    confidence: "high",
    confidenceScore: 82,
    reportCount: 3,
    lastUpdated: "2 hours ago",
    manpower: {
      workersMin: 2,
      workersMax: 3,
      supervisorRequired: false,
      estimatedDuration: "1 hour",
      skillTypes: ["Manual cleaners"]
    },
    equipment: {
      vehicles: ["Small pickup"],
      tools: ["Brooms", "Dustpans"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 80 },
      { type: "Organic", percentage: 20 }
    ],
    history: [
      { date: "Today 7 AM", action: "Morning collection done", responseTime: "30 mins" }
    ]
  },
  {
    id: "area-7",
    name: "Geeta Bhawan Junction",
    ward: "Ward 5 - Central",
    center: { lat: 22.7150, lng: 75.8750 },
    bounds: { north: 22.7180, south: 22.7120, east: 75.8790, west: 75.8710 },
    severity: "low",
    trend: "stable",
    confidence: "low",
    confidenceScore: 28,
    reportCount: 2,
    lastUpdated: "3 hours ago",
    manpower: {
      workersMin: 2,
      workersMax: 2,
      supervisorRequired: false,
      estimatedDuration: "30 mins",
      skillTypes: ["Manual cleaners"]
    },
    equipment: {
      vehicles: [],
      tools: ["Brooms"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 100 }
    ],
    history: []
  },
  {
    id: "area-8",
    name: "Khajrana Temple Area",
    ward: "Ward 15 - East",
    center: { lat: 22.7280, lng: 75.9200 },
    bounds: { north: 22.7320, south: 22.7240, east: 75.9250, west: 75.9150 },
    severity: "medium",
    trend: "worsening",
    confidence: "medium",
    confidenceScore: 62,
    reportCount: 15,
    lastUpdated: "30 mins ago",
    manpower: {
      workersMin: 6,
      workersMax: 8,
      supervisorRequired: true,
      estimatedDuration: "2-3 hours",
      skillTypes: ["Manual cleaners", "Sanitation workers"]
    },
    equipment: {
      vehicles: ["Compactor truck", "Small pickup"],
      tools: ["Brooms", "Shovels", "PPE kits"],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Organic", percentage: 60 },
      { type: "Mixed waste", percentage: 30 },
      { type: "Plastic", percentage: 10 }
    ],
    history: [
      { date: "Yesterday", action: "Evening cleanup", responseTime: "1.5 hours" }
    ]
  },
  {
    id: "area-9",
    name: "Sapna Sangeeta Road",
    ward: "Ward 6 - Central",
    center: { lat: 22.7300, lng: 75.8650 },
    bounds: { north: 22.7330, south: 22.7270, east: 75.8700, west: 75.8600 },
    severity: "negligible",
    trend: "stable",
    confidence: "high",
    confidenceScore: 90,
    reportCount: 1,
    lastUpdated: "4 hours ago",
    manpower: {
      workersMin: 0,
      workersMax: 1,
      supervisorRequired: false,
      estimatedDuration: "None needed",
      skillTypes: []
    },
    equipment: {
      vehicles: [],
      tools: [],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 100 }
    ],
    history: [
      { date: "Today 6 AM", action: "Routine sweep", responseTime: "20 mins" }
    ]
  },
  {
    id: "area-10",
    name: "Bhanwar Kuan Area",
    ward: "Ward 11 - South",
    center: { lat: 22.6950, lng: 75.8700 },
    bounds: { north: 22.6990, south: 22.6910, east: 75.8750, west: 75.8650 },
    severity: "negligible",
    trend: "improving",
    confidence: "low",
    confidenceScore: 22,
    reportCount: 1,
    lastUpdated: "5 hours ago",
    manpower: {
      workersMin: 0,
      workersMax: 0,
      supervisorRequired: false,
      estimatedDuration: "None needed",
      skillTypes: []
    },
    equipment: {
      vehicles: [],
      tools: [],
      specialEquipment: []
    },
    wasteTypes: [
      { type: "Mixed waste", percentage: 100 }
    ],
    history: []
  }
];

export const citySummary = {
  totalAreas: 10,
  criticalAreas: 1,
  highPriorityAreas: 2,
  mediumPriorityAreas: 3,
  lowPriorityAreas: 2,
  negligibleAreas: 2,
  totalReports: 148,
  averageConfidence: "Medium-High",
  lastRefresh: "2 mins ago",
  totalWorkersRequired: { min: 49, max: 64 },
  vehiclesDeployed: 12,
  vehiclesAvailable: 8
};
