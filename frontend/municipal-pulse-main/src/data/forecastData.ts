export type TimeHorizon = 'today' | '7days' | '30days' | '90days';

export interface WasteForecast {
  totalVolume: number;
  organic: number;
  plastic: number;
  dryRecyclables: number;
  hazardous: number;
  zoneDistribution: { zone: string; volume: number; trend: 'up' | 'down' | 'stable' }[];
}

export interface RiskZone {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  overflowBins: number;
  degradedStreets: number;
  coordinates: { x: number; y: number };
}

export interface WorkforceFleetForecast {
  workersRequired: number;
  workersDelta: number;
  vehiclesRequired: number;
  vehiclesDelta: number;
  overtimeHours: number;
  overtimeDelta: number;
  fuelLiters: number;
  fuelDelta: number;
}

export interface InfrastructureLoad {
  facility: string;
  type: 'compost' | 'recycling' | 'transfer' | 'landfill';
  currentLoad: number;
  forecastedLoad: number;
  capacity: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CostForecast {
  cleaningCost: number;
  transportationCost: number;
  processingCost: number;
  totalCost: number;
  potentialSavings: number;
  avoidableLosses: number;
}

export interface ActionPlan {
  zone: string;
  actions: string[];
  priority: 'high' | 'medium' | 'low';
  workforceChange: number;
  vehicleChange: number;
}

export const forecastData: Record<TimeHorizon, {
  waste: WasteForecast;
  risks: RiskZone[];
  workforce: WorkforceFleetForecast;
  infrastructure: InfrastructureLoad[];
  costs: CostForecast;
  actionPlan: ActionPlan[];
}> = {
  today: {
    waste: {
      totalVolume: 1420,
      organic: 568,
      plastic: 284,
      dryRecyclables: 426,
      hazardous: 142,
      zoneDistribution: [
        { zone: 'Zone A - Central', volume: 320, trend: 'stable' },
        { zone: 'Zone B - North', volume: 280, trend: 'up' },
        { zone: 'Zone C - South', volume: 250, trend: 'stable' },
        { zone: 'Zone D - East', volume: 310, trend: 'down' },
        { zone: 'Zone E - West', volume: 260, trend: 'stable' },
      ]
    },
    risks: [
      { id: 'z1', name: 'Rajwada Market', riskLevel: 'medium', overflowBins: 3, degradedStreets: 1, coordinates: { x: 45, y: 35 } },
      { id: 'z2', name: 'Sarafa Bazaar', riskLevel: 'low', overflowBins: 1, degradedStreets: 0, coordinates: { x: 55, y: 45 } },
      { id: 'z3', name: 'Palasia Square', riskLevel: 'low', overflowBins: 2, degradedStreets: 0, coordinates: { x: 35, y: 55 } },
      { id: 'z4', name: 'Vijay Nagar', riskLevel: 'low', overflowBins: 0, degradedStreets: 1, coordinates: { x: 65, y: 30 } },
      { id: 'z5', name: 'Bhawarkuan', riskLevel: 'medium', overflowBins: 2, degradedStreets: 1, coordinates: { x: 25, y: 40 } },
    ],
    workforce: {
      workersRequired: 2400,
      workersDelta: 0,
      vehiclesRequired: 180,
      vehiclesDelta: 0,
      overtimeHours: 120,
      overtimeDelta: 0,
      fuelLiters: 4500,
      fuelDelta: 0,
    },
    infrastructure: [
      { facility: 'Devguradiya Compost Plant', type: 'compost', currentLoad: 280, forecastedLoad: 280, capacity: 400, riskLevel: 'low' },
      { facility: 'Choithram Recycling Unit', type: 'recycling', currentLoad: 180, forecastedLoad: 180, capacity: 250, riskLevel: 'low' },
      { facility: 'Rau Transfer Station', type: 'transfer', currentLoad: 450, forecastedLoad: 450, capacity: 600, riskLevel: 'medium' },
      { facility: 'Devguradiya Landfill', type: 'landfill', currentLoad: 68, forecastedLoad: 68, capacity: 100, riskLevel: 'medium' },
    ],
    costs: {
      cleaningCost: 850000,
      transportationCost: 420000,
      processingCost: 380000,
      totalCost: 1650000,
      potentialSavings: 0,
      avoidableLosses: 0,
    },
    actionPlan: [],
  },
  '7days': {
    waste: {
      totalVolume: 1580,
      organic: 632,
      plastic: 316,
      dryRecyclables: 474,
      hazardous: 158,
      zoneDistribution: [
        { zone: 'Zone A - Central', volume: 380, trend: 'up' },
        { zone: 'Zone B - North', volume: 320, trend: 'up' },
        { zone: 'Zone C - South', volume: 270, trend: 'up' },
        { zone: 'Zone D - East', volume: 340, trend: 'stable' },
        { zone: 'Zone E - West', volume: 270, trend: 'stable' },
      ]
    },
    risks: [
      { id: 'z1', name: 'Rajwada Market', riskLevel: 'high', overflowBins: 8, degradedStreets: 3, coordinates: { x: 45, y: 35 } },
      { id: 'z2', name: 'Sarafa Bazaar', riskLevel: 'medium', overflowBins: 4, degradedStreets: 1, coordinates: { x: 55, y: 45 } },
      { id: 'z3', name: 'Palasia Square', riskLevel: 'medium', overflowBins: 3, degradedStreets: 1, coordinates: { x: 35, y: 55 } },
      { id: 'z4', name: 'Vijay Nagar', riskLevel: 'low', overflowBins: 1, degradedStreets: 1, coordinates: { x: 65, y: 30 } },
      { id: 'z5', name: 'Bhawarkuan', riskLevel: 'high', overflowBins: 6, degradedStreets: 2, coordinates: { x: 25, y: 40 } },
    ],
    workforce: {
      workersRequired: 2650,
      workersDelta: 250,
      vehiclesRequired: 200,
      vehiclesDelta: 20,
      overtimeHours: 280,
      overtimeDelta: 160,
      fuelLiters: 5200,
      fuelDelta: 700,
    },
    infrastructure: [
      { facility: 'Devguradiya Compost Plant', type: 'compost', currentLoad: 280, forecastedLoad: 340, capacity: 400, riskLevel: 'medium' },
      { facility: 'Choithram Recycling Unit', type: 'recycling', currentLoad: 180, forecastedLoad: 220, capacity: 250, riskLevel: 'medium' },
      { facility: 'Rau Transfer Station', type: 'transfer', currentLoad: 450, forecastedLoad: 540, capacity: 600, riskLevel: 'high' },
      { facility: 'Devguradiya Landfill', type: 'landfill', currentLoad: 68, forecastedLoad: 78, capacity: 100, riskLevel: 'high' },
    ],
    costs: {
      cleaningCost: 980000,
      transportationCost: 520000,
      processingCost: 440000,
      totalCost: 1940000,
      potentialSavings: 180000,
      avoidableLosses: 95000,
    },
    actionPlan: [
      {
        zone: 'Rajwada Market',
        priority: 'high',
        actions: ['Deploy additional bins', 'Increase collection frequency to 3x daily', 'Assign dedicated sweeping crew'],
        workforceChange: 15,
        vehicleChange: 2,
      },
      {
        zone: 'Bhawarkuan',
        priority: 'high',
        actions: ['Pre-position overflow containers', 'Extend evening shift by 2 hours', 'Add compactor vehicle'],
        workforceChange: 10,
        vehicleChange: 1,
      },
      {
        zone: 'Sarafa Bazaar',
        priority: 'medium',
        actions: ['Install temporary waste stations', 'Coordinate with vendors for segregation'],
        workforceChange: 5,
        vehicleChange: 0,
      },
    ],
  },
  '30days': {
    waste: {
      totalVolume: 1850,
      organic: 740,
      plastic: 370,
      dryRecyclables: 555,
      hazardous: 185,
      zoneDistribution: [
        { zone: 'Zone A - Central', volume: 450, trend: 'up' },
        { zone: 'Zone B - North', volume: 380, trend: 'up' },
        { zone: 'Zone C - South', volume: 320, trend: 'up' },
        { zone: 'Zone D - East', volume: 390, trend: 'up' },
        { zone: 'Zone E - West', volume: 310, trend: 'stable' },
      ]
    },
    risks: [
      { id: 'z1', name: 'Rajwada Market', riskLevel: 'high', overflowBins: 15, degradedStreets: 6, coordinates: { x: 45, y: 35 } },
      { id: 'z2', name: 'Sarafa Bazaar', riskLevel: 'high', overflowBins: 10, degradedStreets: 4, coordinates: { x: 55, y: 45 } },
      { id: 'z3', name: 'Palasia Square', riskLevel: 'high', overflowBins: 8, degradedStreets: 3, coordinates: { x: 35, y: 55 } },
      { id: 'z4', name: 'Vijay Nagar', riskLevel: 'medium', overflowBins: 4, degradedStreets: 2, coordinates: { x: 65, y: 30 } },
      { id: 'z5', name: 'Bhawarkuan', riskLevel: 'high', overflowBins: 12, degradedStreets: 5, coordinates: { x: 25, y: 40 } },
    ],
    workforce: {
      workersRequired: 3100,
      workersDelta: 700,
      vehiclesRequired: 240,
      vehiclesDelta: 60,
      overtimeHours: 580,
      overtimeDelta: 460,
      fuelLiters: 6800,
      fuelDelta: 2300,
    },
    infrastructure: [
      { facility: 'Devguradiya Compost Plant', type: 'compost', currentLoad: 280, forecastedLoad: 380, capacity: 400, riskLevel: 'high' },
      { facility: 'Choithram Recycling Unit', type: 'recycling', currentLoad: 180, forecastedLoad: 240, capacity: 250, riskLevel: 'high' },
      { facility: 'Rau Transfer Station', type: 'transfer', currentLoad: 450, forecastedLoad: 580, capacity: 600, riskLevel: 'high' },
      { facility: 'Devguradiya Landfill', type: 'landfill', currentLoad: 68, forecastedLoad: 92, capacity: 100, riskLevel: 'high' },
    ],
    costs: {
      cleaningCost: 1250000,
      transportationCost: 680000,
      processingCost: 580000,
      totalCost: 2510000,
      potentialSavings: 420000,
      avoidableLosses: 280000,
    },
    actionPlan: [
      {
        zone: 'Rajwada Market',
        priority: 'high',
        actions: ['Deploy mobile compaction units', 'Establish 24/7 collection operations', 'Install smart bin sensors', 'Coordinate with traffic for priority routing'],
        workforceChange: 35,
        vehicleChange: 5,
      },
      {
        zone: 'Sarafa Bazaar',
        priority: 'high',
        actions: ['Set up secondary collection points', 'Deploy electric carts for narrow lanes', 'Mandate vendor waste segregation'],
        workforceChange: 20,
        vehicleChange: 3,
      },
      {
        zone: 'Palasia Square',
        priority: 'high',
        actions: ['Activate emergency overflow protocol', 'Divert waste to alternate processing facilities'],
        workforceChange: 15,
        vehicleChange: 2,
      },
      {
        zone: 'Bhawarkuan',
        priority: 'high',
        actions: ['Deploy additional compactor trucks', 'Extend operations to double shifts', 'Pre-stage containers at identified hotspots'],
        workforceChange: 25,
        vehicleChange: 4,
      },
      {
        zone: 'Vijay Nagar',
        priority: 'medium',
        actions: ['Increase bin capacity by 50%', 'Add evening collection round'],
        workforceChange: 8,
        vehicleChange: 1,
      },
    ],
  },
  '90days': {
    waste: {
      totalVolume: 2200,
      organic: 880,
      plastic: 440,
      dryRecyclables: 660,
      hazardous: 220,
      zoneDistribution: [
        { zone: 'Zone A - Central', volume: 540, trend: 'up' },
        { zone: 'Zone B - North', volume: 460, trend: 'up' },
        { zone: 'Zone C - South', volume: 400, trend: 'up' },
        { zone: 'Zone D - East', volume: 450, trend: 'up' },
        { zone: 'Zone E - West', volume: 350, trend: 'stable' },
      ]
    },
    risks: [
      { id: 'z1', name: 'Rajwada Market', riskLevel: 'high', overflowBins: 25, degradedStreets: 12, coordinates: { x: 45, y: 35 } },
      { id: 'z2', name: 'Sarafa Bazaar', riskLevel: 'high', overflowBins: 18, degradedStreets: 8, coordinates: { x: 55, y: 45 } },
      { id: 'z3', name: 'Palasia Square', riskLevel: 'high', overflowBins: 14, degradedStreets: 6, coordinates: { x: 35, y: 55 } },
      { id: 'z4', name: 'Vijay Nagar', riskLevel: 'high', overflowBins: 10, degradedStreets: 5, coordinates: { x: 65, y: 30 } },
      { id: 'z5', name: 'Bhawarkuan', riskLevel: 'high', overflowBins: 20, degradedStreets: 10, coordinates: { x: 25, y: 40 } },
    ],
    workforce: {
      workersRequired: 3800,
      workersDelta: 1400,
      vehiclesRequired: 300,
      vehiclesDelta: 120,
      overtimeHours: 1200,
      overtimeDelta: 1080,
      fuelLiters: 9500,
      fuelDelta: 5000,
    },
    infrastructure: [
      { facility: 'Devguradiya Compost Plant', type: 'compost', currentLoad: 280, forecastedLoad: 420, capacity: 400, riskLevel: 'high' },
      { facility: 'Choithram Recycling Unit', type: 'recycling', currentLoad: 180, forecastedLoad: 270, capacity: 250, riskLevel: 'high' },
      { facility: 'Rau Transfer Station', type: 'transfer', currentLoad: 450, forecastedLoad: 620, capacity: 600, riskLevel: 'high' },
      { facility: 'Devguradiya Landfill', type: 'landfill', currentLoad: 68, forecastedLoad: 105, capacity: 100, riskLevel: 'high' },
    ],
    costs: {
      cleaningCost: 1650000,
      transportationCost: 920000,
      processingCost: 780000,
      totalCost: 3350000,
      potentialSavings: 680000,
      avoidableLosses: 520000,
    },
    actionPlan: [
      {
        zone: 'City-Wide',
        priority: 'high',
        actions: ['Activate emergency waste management protocol', 'Request additional vehicles from neighboring municipalities', 'Deploy temporary processing units', 'Implement waste reduction awareness campaign'],
        workforceChange: 200,
        vehicleChange: 30,
      },
      {
        zone: 'Rajwada Market',
        priority: 'high',
        actions: ['Establish satellite transfer station', 'Deploy round-the-clock operations', 'Install permanent waste compaction units'],
        workforceChange: 50,
        vehicleChange: 8,
      },
      {
        zone: 'Sarafa Bazaar',
        priority: 'high',
        actions: ['Mandate business waste management plans', 'Deploy specialized food waste collection', 'Install underground waste containers'],
        workforceChange: 30,
        vehicleChange: 5,
      },
      {
        zone: 'Infrastructure',
        priority: 'high',
        actions: ['Fast-track compost plant expansion', 'Activate contingency landfill capacity', 'Divert recyclables to private processors'],
        workforceChange: 40,
        vehicleChange: 10,
      },
    ],
  },
};

export const forecastExplanation = {
  dataSources: [
    { name: 'Historical Waste Patterns', description: '3 years of daily collection data by zone and waste type' },
    { name: 'Recent Trends', description: 'Last 30 days collection volume and composition changes' },
    { name: 'Weather Effects', description: 'Monsoon, summer, and festival season impact factors' },
    { name: 'Events & Festivals', description: 'Scheduled events, religious festivals, and public gatherings' },
    { name: 'Population Movement', description: 'Tourism data, migration patterns, and daily commuter flows' },
    { name: 'Capacity Limits', description: 'Bin capacity, vehicle load limits, and route constraints' },
  ],
  confidenceLevel: 85,
  lastUpdated: '2026-01-10 08:00 AM',
};
