export const fleetData = [
  { id: 'TRK-001', type: 'Compactor', status: 'Active', tripsToday: 8, avgLoad: 92, idleTime: 4 },
  { id: 'TRK-002', type: 'Dumper', status: 'Active', tripsToday: 6, avgLoad: 87, idleTime: 8 },
  { id: 'TRK-003', type: 'Compactor', status: 'Active', tripsToday: 9, avgLoad: 94, idleTime: 3 },
  { id: 'TRK-004', type: 'Loader', status: 'Active', tripsToday: 5, avgLoad: 76, idleTime: 12 },
  { id: 'TRK-005', type: 'Loader', status: 'Active', tripsToday: 7, avgLoad: 81, idleTime: 6 },
  { id: 'TRK-006', type: 'Loader', status: 'Maintenance', tripsToday: 0, avgLoad: 0, idleTime: 0 },
  { id: 'TRK-007', type: 'Compactor', status: 'Active', tripsToday: 5, avgLoad: 89, idleTime: 7 },
  { id: 'TRK-008', type: 'Dumper', status: 'Idle', tripsToday: 1, avgLoad: 32, idleTime: 42 },
];

export const fleetInsights = [
  "2 trucks underutilized in Zone 3",
  "Compactor trucks operating near optimal capacity",
  "TRK-006 scheduled for maintenance completion tomorrow",
];

export const zoneAllocations: ZoneAllocation[] = [
  { zone: 'Zone 1', required: 24, assigned: 26 },
  { zone: 'Zone 2', required: 18, assigned: 18 },
  { zone: 'Zone 3', required: 22, assigned: 20 },
  { zone: 'Zone 4', required: 16, assigned: 16 },
  { zone: 'Zone 5', required: 20, assigned: 22 },
  { zone: 'Zone 6', required: 14, assigned: 14 },
];

export const workforceInsights = [
  "Balanced workload reduced overtime by 22%",
  "Team B overloaded — recommend redistribution",
  "Zone 3 understaffed by 2 workers for peak hours",
];

export const routeStats = {
  avgRouteLength: 12.4,
  baselineRouteLength: 15.8,
  reductionPercent: 21.5,
  tripsEliminated: 34,
  fuelSaved: 420,
};

export const capacityData = [
  { name: 'Compost Plant', load: 72, status: 'Optimal' as const, explanation: 'Operating within efficient range' },
  { name: 'Recycling Facility', load: 88, status: 'Near Capacity' as const, explanation: 'Consider diverting plastic to MRF-2' },
  { name: 'Transfer Station', load: 65, status: 'Optimal' as const, explanation: 'Good throughput maintained' },
  { name: 'Landfill', load: 15, status: 'Optimal' as const, explanation: '85% diverted through recycling' },
];

export const savingsData: SavingsCategory[] = [
  { category: 'Fuel Savings', amount: 145000, percentChange: 18 },
  { category: 'Overtime Savings', amount: 89000, percentChange: 22 },
  { category: 'Vehicle Maintenance Avoided', amount: 67000, percentChange: 12 },
  { category: 'Outsourcing Avoided', amount: 38000, percentChange: 8 },
];

export const aiOptimizations = [
  "Merged Zone 4 & 5 routes due to low waste volume",
  "Delayed deployment to avoid idle time during morning hours",
  "Reassigned workers based on productivity history",
  "Reduced collection frequency in low-density residential areas",
  "Consolidated evening shifts to minimize overtime",
];

export const forecastData: Record<TimeHorizon, ForecastData> = {
  today: {
    trucksRequired: 18,
    trucksBaseline: 25,
    workersRequired: 124,
    workersBaseline: 160,
    expectedCost: 285000,
    predictedSavings: 340000,
  },
  '7days': {
    trucksRequired: 17,
    trucksBaseline: 24,
    workersRequired: 120,
    workersBaseline: 155,
    expectedCost: 1890000,
    predictedSavings: 480000,
  },
  '30days': {
    trucksRequired: 16,
    trucksBaseline: 21,
    workersRequired: 118,
    workersBaseline: 150,
    expectedCost: 7200000,
    predictedSavings: 610000,
  },
  '90days': {
    trucksRequired: 15,
    trucksBaseline: 20,
    workersRequired: 112,
    workersBaseline: 145,
    expectedCost: 19500000,
    predictedSavings: 1850000,
  },
};

export const healthIndicators = {
  fleetStress: 'Low' as const,
  workforceFatigue: 'Medium' as const,
  capacitySaturation: 'Low' as const,
};
