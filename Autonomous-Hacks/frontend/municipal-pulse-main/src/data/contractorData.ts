export interface Contractor {
  id: string;
  name: string;
  assignedZones: string[];
  contractType: 'Collection' | 'Processing' | 'MRF' | 'Landfill';
  slaCompliance: number;
  activeTasks: number;
  paymentStatus: 'Pending' | 'Released' | 'Partial';
  riskIndicator: boolean;
  contractStart: string;
  contractEnd: string;
  scopeOfWork: string;
  kpis: {
    collectionFrequency: string;
    segregationPurity: number;
    processingCapacity: number;
  };
  penaltyRules: string[];
  incentiveRules: string[];
}

export interface ContractorTask {
  id: string;
  contractorId: string;
  zone: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'Assigned' | 'In Progress' | 'Completed';
  eta: string;
  assignedResources: number;
  description: string;
}

export interface ProofOfWork {
  id: string;
  contractorId: string;
  taskId: string;
  beforeImage: string;
  afterImage: string;
  timestamp: string;
  location: string;
  verificationStatus: 'Verified' | 'Partial' | 'Rejected';
  aiExplanation: string;
  confidence: number;
}

export interface Invoice {
  id: string;
  contractorId: string;
  month: string;
  generatedAmount: number;
  approvedAmount: number;
  penaltiesDeducted: number;
  finalPayable: number;
  status: 'Pending' | 'Released' | 'Disputed' | 'Partial';
  deductionReasons: string[];
}

export interface WasteProcessingRevenue {
  id: string;
  contractorId: string;
  wasteType: 'Plastic' | 'RDF' | 'Compost' | 'C&D';
  quantityTons: number;
  buyer: string;
  salePrice: number;
  municipalShare: number;
  contractorShare: number;
}

export interface ContractorPerformance {
  contractorId: string;
  avgTaskCompletionTime: string;
  slaBreachCount: number;
  reworkRate: number;
  citizenComplaints: number;
  costPerTon: number;
  grade: 'A' | 'B' | 'C';
  environmentalCompliance: boolean;
  reportingDelays: number;
  auditReadinessScore: number;
  aiRiskNotes: string[];
}

export const contractors: Contractor[] = [
  {
    id: 'CON001',
    name: 'GreenWaste Solutions Pvt Ltd',
    assignedZones: ['Zone 12 - Vijay Nagar', 'Zone 15 - Palasia'],
    contractType: 'Collection',
    slaCompliance: 94,
    activeTasks: 8,
    paymentStatus: 'Released',
    riskIndicator: false,
    contractStart: '2024-04-01',
    contractEnd: '2027-03-31',
    scopeOfWork: 'Door-to-door waste collection, segregation at source, transport to MRF',
    kpis: {
      collectionFrequency: 'Daily 6AM-10AM',
      segregationPurity: 85,
      processingCapacity: 120
    },
    penaltyRules: ['₹5000/day for missed collection', '₹2000 per citizen complaint', '2% deduction per SLA breach'],
    incentiveRules: ['5% bonus for >95% SLA compliance', '₹10000 for zero complaints in month']
  },
  {
    id: 'CON002',
    name: 'EcoProcess Industries',
    assignedZones: ['Zone 8 - Rau', 'Zone 9 - Dewas Naka'],
    contractType: 'Processing',
    slaCompliance: 87,
    activeTasks: 5,
    paymentStatus: 'Pending',
    riskIndicator: true,
    contractStart: '2023-10-01',
    contractEnd: '2026-09-30',
    scopeOfWork: 'Wet waste composting, RDF production, quality control',
    kpis: {
      collectionFrequency: 'Batch processing 3x/week',
      segregationPurity: 90,
      processingCapacity: 80
    },
    penaltyRules: ['₹10000 for capacity underutilization', '₹5000 for quality rejection'],
    incentiveRules: ['3% bonus for >90% capacity utilization']
  },
  {
    id: 'CON003',
    name: 'CleanCity MRF Operations',
    assignedZones: ['Zone 3 - Rajwada', 'Zone 4 - Cloth Market'],
    contractType: 'MRF',
    slaCompliance: 91,
    activeTasks: 12,
    paymentStatus: 'Released',
    riskIndicator: false,
    contractStart: '2024-01-01',
    contractEnd: '2028-12-31',
    scopeOfWork: 'Material recovery, sorting, baling, recycler liaison',
    kpis: {
      collectionFrequency: 'Continuous operation',
      segregationPurity: 92,
      processingCapacity: 200
    },
    penaltyRules: ['₹8000 for equipment downtime >4hrs', '₹3000 per rejected bale'],
    incentiveRules: ['4% bonus for >90% recovery rate', '₹15000 for zero safety incidents']
  },
  {
    id: 'CON004',
    name: 'SafeLand Disposal Services',
    assignedZones: ['Devguradiya Landfill'],
    contractType: 'Landfill',
    slaCompliance: 78,
    activeTasks: 3,
    paymentStatus: 'Partial',
    riskIndicator: true,
    contractStart: '2022-06-01',
    contractEnd: '2025-05-31',
    scopeOfWork: 'Scientific landfill management, leachate treatment, gas capture',
    kpis: {
      collectionFrequency: '24x7 operations',
      segregationPurity: 75,
      processingCapacity: 500
    },
    penaltyRules: ['₹50000 for environmental violation', '₹20000 for leachate overflow'],
    incentiveRules: ['2% bonus for methane capture targets']
  },
  {
    id: 'CON005',
    name: 'SwachhBharat Collection Co',
    assignedZones: ['Zone 18 - Bhawarkua', 'Zone 19 - Geeta Bhawan'],
    contractType: 'Collection',
    slaCompliance: 96,
    activeTasks: 6,
    paymentStatus: 'Released',
    riskIndicator: false,
    contractStart: '2024-07-01',
    contractEnd: '2027-06-30',
    scopeOfWork: 'Residential and commercial waste collection, source segregation enforcement',
    kpis: {
      collectionFrequency: 'Daily 5AM-9AM',
      segregationPurity: 88,
      processingCapacity: 100
    },
    penaltyRules: ['₹4000/day for missed collection', '₹1500 per complaint'],
    incentiveRules: ['6% bonus for >98% SLA', '₹8000 for best zone award']
  }
];

export const contractorTasks: ContractorTask[] = [
  { id: 'TSK001', contractorId: 'CON001', zone: 'Zone 12 - Vijay Nagar', priority: 'P1', status: 'In Progress', eta: '2024-01-15 10:00', assignedResources: 4, description: 'Morning collection round - Sector A' },
  { id: 'TSK002', contractorId: 'CON001', zone: 'Zone 15 - Palasia', priority: 'P2', status: 'Assigned', eta: '2024-01-15 14:00', assignedResources: 3, description: 'Commercial waste pickup' },
  { id: 'TSK003', contractorId: 'CON002', zone: 'Zone 8 - Rau', priority: 'P1', status: 'In Progress', eta: '2024-01-15 18:00', assignedResources: 6, description: 'Compost batch processing' },
  { id: 'TSK004', contractorId: 'CON002', zone: 'Zone 9 - Dewas Naka', priority: 'P3', status: 'Completed', eta: '2024-01-14 16:00', assignedResources: 2, description: 'Quality inspection' },
  { id: 'TSK005', contractorId: 'CON003', zone: 'Zone 3 - Rajwada', priority: 'P1', status: 'In Progress', eta: '2024-01-15 12:00', assignedResources: 8, description: 'Plastic sorting and baling' },
  { id: 'TSK006', contractorId: 'CON003', zone: 'Zone 4 - Cloth Market', priority: 'P2', status: 'Assigned', eta: '2024-01-15 16:00', assignedResources: 5, description: 'Metal recovery operation' },
  { id: 'TSK007', contractorId: 'CON004', zone: 'Devguradiya Landfill', priority: 'P1', status: 'In Progress', eta: '2024-01-15 20:00', assignedResources: 10, description: 'Leachate treatment cycle' },
  { id: 'TSK008', contractorId: 'CON005', zone: 'Zone 18 - Bhawarkua', priority: 'P2', status: 'Completed', eta: '2024-01-15 09:00', assignedResources: 4, description: 'Morning collection completed' }
];

export const proofOfWork: ProofOfWork[] = [
  { id: 'POW001', contractorId: 'CON001', taskId: 'TSK001', beforeImage: '/placeholder.svg', afterImage: '/placeholder.svg', timestamp: '2024-01-15 08:45', location: 'Vijay Nagar, Sector A, Point 12', verificationStatus: 'Verified', aiExplanation: 'Clear improvement visible. Waste removed, area cleaned. GPS location matches assigned route.', confidence: 94 },
  { id: 'POW002', contractorId: 'CON001', taskId: 'TSK001', beforeImage: '/placeholder.svg', afterImage: '/placeholder.svg', timestamp: '2024-01-15 09:12', location: 'Vijay Nagar, Sector A, Point 15', verificationStatus: 'Verified', aiExplanation: 'Segregation visible at source. Wet and dry waste separated correctly.', confidence: 91 },
  { id: 'POW003', contractorId: 'CON002', taskId: 'TSK003', beforeImage: '/placeholder.svg', afterImage: '/placeholder.svg', timestamp: '2024-01-15 14:30', location: 'Rau Processing Facility', verificationStatus: 'Partial', aiExplanation: 'Processing visible but quality unclear. After image shows incomplete batch processing.', confidence: 67 },
  { id: 'POW004', contractorId: 'CON003', taskId: 'TSK005', beforeImage: '/placeholder.svg', afterImage: '/placeholder.svg', timestamp: '2024-01-15 10:45', location: 'Rajwada MRF - Sorting Bay 2', verificationStatus: 'Verified', aiExplanation: 'Plastic bales correctly formed. Weight tags visible and match reported tonnage.', confidence: 96 },
  { id: 'POW005', contractorId: 'CON004', taskId: 'TSK007', beforeImage: '/placeholder.svg', afterImage: '/placeholder.svg', timestamp: '2024-01-15 16:00', location: 'Devguradiya - Leachate Pond', verificationStatus: 'Rejected', aiExplanation: 'After image shows overflow condition. Treatment incomplete. Environmental risk detected.', confidence: 88 }
];

export const invoices: Invoice[] = [
  { id: 'INV001', contractorId: 'CON001', month: 'December 2024', generatedAmount: 1850000, approvedAmount: 1820000, penaltiesDeducted: 30000, finalPayable: 1820000, status: 'Released', deductionReasons: ['2 missed collection instances (₹10000)', 'Citizen complaints x4 (₹8000)', 'Minor SLA breach (₹12000)'] },
  { id: 'INV002', contractorId: 'CON002', month: 'December 2024', generatedAmount: 1200000, approvedAmount: 1080000, penaltiesDeducted: 120000, finalPayable: 1080000, status: 'Pending', deductionReasons: ['Capacity underutilization 3 days (₹30000)', 'Quality rejections x6 (₹30000)', 'SLA breaches x4 (₹60000)'] },
  { id: 'INV003', contractorId: 'CON003', month: 'December 2024', generatedAmount: 2200000, approvedAmount: 2288000, penaltiesDeducted: 0, finalPayable: 2288000, status: 'Released', deductionReasons: [] },
  { id: 'INV004', contractorId: 'CON004', month: 'December 2024', generatedAmount: 3500000, approvedAmount: 2800000, penaltiesDeducted: 700000, finalPayable: 2100000, status: 'Partial', deductionReasons: ['Environmental violation (₹50000)', 'Leachate overflow x2 (₹40000)', 'Multiple SLA breaches (₹610000)'] },
  { id: 'INV005', contractorId: 'CON005', month: 'December 2024', generatedAmount: 1600000, approvedAmount: 1696000, penaltiesDeducted: 0, finalPayable: 1696000, status: 'Released', deductionReasons: [] }
];

export const wasteProcessingRevenue: WasteProcessingRevenue[] = [
  { id: 'WPR001', contractorId: 'CON002', wasteType: 'Compost', quantityTons: 45, buyer: 'Krishi Vikas Samiti', salePrice: 180000, municipalShare: 126000, contractorShare: 54000 },
  { id: 'WPR002', contractorId: 'CON002', wasteType: 'RDF', quantityTons: 30, buyer: 'ACC Cement Works', salePrice: 120000, municipalShare: 84000, contractorShare: 36000 },
  { id: 'WPR003', contractorId: 'CON003', wasteType: 'Plastic', quantityTons: 25, buyer: 'Reliance Polymers', salePrice: 375000, municipalShare: 262500, contractorShare: 112500 },
  { id: 'WPR004', contractorId: 'CON003', wasteType: 'C&D', quantityTons: 80, buyer: 'IMC Road Division', salePrice: 160000, municipalShare: 112000, contractorShare: 48000 },
  { id: 'WPR005', contractorId: 'CON004', wasteType: 'RDF', quantityTons: 60, buyer: 'Ultratech Cement', salePrice: 240000, municipalShare: 168000, contractorShare: 72000 }
];

export const contractorPerformance: ContractorPerformance[] = [
  { contractorId: 'CON001', avgTaskCompletionTime: '2.4 hrs', slaBreachCount: 3, reworkRate: 2.1, citizenComplaints: 4, costPerTon: 1850, grade: 'A', environmentalCompliance: true, reportingDelays: 0, auditReadinessScore: 92, aiRiskNotes: ['Eligible for incentive this month', 'Consistent performance over last quarter'] },
  { contractorId: 'CON002', avgTaskCompletionTime: '4.8 hrs', slaBreachCount: 8, reworkRate: 8.5, citizenComplaints: 2, costPerTon: 2400, grade: 'C', environmentalCompliance: true, reportingDelays: 5, auditReadinessScore: 68, aiRiskNotes: ['Repeated minor SLA violations detected', 'High processing efficiency but delayed reporting', 'Recommend performance review meeting'] },
  { contractorId: 'CON003', avgTaskCompletionTime: '3.1 hrs', slaBreachCount: 2, reworkRate: 1.8, citizenComplaints: 0, costPerTon: 1650, grade: 'A', environmentalCompliance: true, reportingDelays: 1, auditReadinessScore: 95, aiRiskNotes: ['Eligible for incentive this month', 'Best performing MRF contractor', 'Zero safety incidents in 6 months'] },
  { contractorId: 'CON004', avgTaskCompletionTime: '6.2 hrs', slaBreachCount: 12, reworkRate: 15.2, citizenComplaints: 8, costPerTon: 3200, grade: 'C', environmentalCompliance: false, reportingDelays: 8, auditReadinessScore: 45, aiRiskNotes: ['Critical: Environmental compliance failure', 'Multiple leachate overflow incidents', 'Contract review recommended', 'High risk of regulatory action'] },
  { contractorId: 'CON005', avgTaskCompletionTime: '2.1 hrs', slaBreachCount: 1, reworkRate: 0.8, citizenComplaints: 1, costPerTon: 1720, grade: 'A', environmentalCompliance: true, reportingDelays: 0, auditReadinessScore: 98, aiRiskNotes: ['Eligible for bonus this month', 'Highest SLA compliance in collection category', 'Model contractor for new onboarding'] }
];

export const pppMetrics = {
  totalContractors: 5,
  activeContracts: 5,
  avgSlaCompliance: 89.2,
  pendingPayments: 3180000,
  highRiskContractors: 2
};
