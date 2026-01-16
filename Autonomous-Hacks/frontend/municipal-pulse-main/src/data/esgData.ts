export interface CorporateSponsor {
  id: string;
  name: string;
  logo: string;
  industry: string;
  sponsorshipLevel: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  activeZones: number;
  totalInvestment: number;
  greenCoinsIssued: number;
  partnerSince: string;
}

export interface SponsoredZone {
  id: string;
  name: string;
  ward: string;
  sponsor: CorporateSponsor;
  sponsorshipStart: string;
  sponsorshipEnd: string;
  coordinates: { x: number; y: number };
  beforeMetrics: {
    wasteVolume: number;
    cleanlinessScore: number;
    landfillPercentage: number;
  };
  afterMetrics: {
    wasteVolume: number;
    cleanlinessScore: number;
    landfillPercentage: number;
  };
  verifications: AIVerification[];
  greenCoinsIssued: number;
  carbonReduction: number;
}

export interface AIVerification {
  id: string;
  method: 'image_analysis' | 'collection_logs' | 'timestamp_route' | 'facility_intake';
  description: string;
  verified: boolean;
  timestamp: string;
  confidence: number;
}

export const corporateSponsors: CorporateSponsor[] = [
  {
    id: 'corp-1',
    name: 'Tata Group',
    logo: 'TG',
    industry: 'Conglomerate',
    sponsorshipLevel: 'Platinum',
    activeZones: 12,
    totalInvestment: 45000000,
    greenCoinsIssued: 12500,
    partnerSince: '2023-01-15'
  },
  {
    id: 'corp-2',
    name: 'Infosys Foundation',
    logo: 'IF',
    industry: 'Technology',
    sponsorshipLevel: 'Gold',
    activeZones: 8,
    totalInvestment: 28000000,
    greenCoinsIssued: 8200,
    partnerSince: '2023-04-10'
  },
  {
    id: 'corp-3',
    name: 'Mahindra & Mahindra',
    logo: 'MM',
    industry: 'Automotive',
    sponsorshipLevel: 'Gold',
    activeZones: 6,
    totalInvestment: 22000000,
    greenCoinsIssued: 6800,
    partnerSince: '2023-06-20'
  },
  {
    id: 'corp-4',
    name: 'Reliance Foundation',
    logo: 'RF',
    industry: 'Energy & Retail',
    sponsorshipLevel: 'Platinum',
    activeZones: 15,
    totalInvestment: 55000000,
    greenCoinsIssued: 15200,
    partnerSince: '2022-11-05'
  },
  {
    id: 'corp-5',
    name: 'Wipro Ltd',
    logo: 'WP',
    industry: 'Technology',
    sponsorshipLevel: 'Silver',
    activeZones: 4,
    totalInvestment: 12000000,
    greenCoinsIssued: 3400,
    partnerSince: '2024-02-12'
  }
];

export const sponsoredZones: SponsoredZone[] = [
  {
    id: 'zone-1',
    name: 'Koramangala Block 4',
    ward: 'Ward 151',
    sponsor: corporateSponsors[0],
    sponsorshipStart: '2023-06-01',
    sponsorshipEnd: '2025-05-31',
    coordinates: { x: 65, y: 45 },
    beforeMetrics: {
      wasteVolume: 245,
      cleanlinessScore: 52,
      landfillPercentage: 78
    },
    afterMetrics: {
      wasteVolume: 168,
      cleanlinessScore: 84,
      landfillPercentage: 32
    },
    verifications: [
      { id: 'v1', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-10T08:30:00Z', confidence: 94 },
      { id: 'v2', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-10T09:15:00Z', confidence: 98 },
      { id: 'v3', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-10T10:00:00Z', confidence: 96 },
      { id: 'v4', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-10T14:20:00Z', confidence: 99 }
    ],
    greenCoinsIssued: 1850,
    carbonReduction: 12.4
  },
  {
    id: 'zone-2',
    name: 'Indiranagar Stage 1',
    ward: 'Ward 82',
    sponsor: corporateSponsors[1],
    sponsorshipStart: '2023-08-15',
    sponsorshipEnd: '2025-08-14',
    coordinates: { x: 72, y: 35 },
    beforeMetrics: {
      wasteVolume: 312,
      cleanlinessScore: 48,
      landfillPercentage: 82
    },
    afterMetrics: {
      wasteVolume: 198,
      cleanlinessScore: 79,
      landfillPercentage: 38
    },
    verifications: [
      { id: 'v5', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-09T08:45:00Z', confidence: 92 },
      { id: 'v6', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-09T09:30:00Z', confidence: 97 },
      { id: 'v7', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-09T10:15:00Z', confidence: 95 },
      { id: 'v8', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-09T14:45:00Z', confidence: 98 }
    ],
    greenCoinsIssued: 2120,
    carbonReduction: 15.8
  },
  {
    id: 'zone-3',
    name: 'Whitefield Main',
    ward: 'Ward 85',
    sponsor: corporateSponsors[3],
    sponsorshipStart: '2023-03-01',
    sponsorshipEnd: '2025-02-28',
    coordinates: { x: 85, y: 28 },
    beforeMetrics: {
      wasteVolume: 428,
      cleanlinessScore: 45,
      landfillPercentage: 85
    },
    afterMetrics: {
      wasteVolume: 256,
      cleanlinessScore: 82,
      landfillPercentage: 28
    },
    verifications: [
      { id: 'v9', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-10T07:30:00Z', confidence: 96 },
      { id: 'v10', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-10T08:45:00Z', confidence: 99 },
      { id: 'v11', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-10T09:30:00Z', confidence: 97 },
      { id: 'v12', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-10T15:00:00Z', confidence: 98 }
    ],
    greenCoinsIssued: 3240,
    carbonReduction: 22.6
  },
  {
    id: 'zone-4',
    name: 'Jayanagar 4th Block',
    ward: 'Ward 170',
    sponsor: corporateSponsors[2],
    sponsorshipStart: '2023-09-01',
    sponsorshipEnd: '2025-08-31',
    coordinates: { x: 45, y: 62 },
    beforeMetrics: {
      wasteVolume: 198,
      cleanlinessScore: 58,
      landfillPercentage: 72
    },
    afterMetrics: {
      wasteVolume: 142,
      cleanlinessScore: 86,
      landfillPercentage: 35
    },
    verifications: [
      { id: 'v13', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-10T08:00:00Z', confidence: 93 },
      { id: 'v14', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-10T09:00:00Z', confidence: 96 },
      { id: 'v15', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-10T09:45:00Z', confidence: 94 },
      { id: 'v16', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-10T14:30:00Z', confidence: 97 }
    ],
    greenCoinsIssued: 1420,
    carbonReduction: 9.8
  },
  {
    id: 'zone-5',
    name: 'HSR Layout Sector 2',
    ward: 'Ward 174',
    sponsor: corporateSponsors[4],
    sponsorshipStart: '2024-01-01',
    sponsorshipEnd: '2025-12-31',
    coordinates: { x: 58, y: 72 },
    beforeMetrics: {
      wasteVolume: 275,
      cleanlinessScore: 50,
      landfillPercentage: 80
    },
    afterMetrics: {
      wasteVolume: 195,
      cleanlinessScore: 75,
      landfillPercentage: 42
    },
    verifications: [
      { id: 'v17', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-10T08:15:00Z', confidence: 91 },
      { id: 'v18', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-10T09:20:00Z', confidence: 95 },
      { id: 'v19', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-10T10:05:00Z', confidence: 93 },
      { id: 'v20', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-10T14:40:00Z', confidence: 96 }
    ],
    greenCoinsIssued: 980,
    carbonReduction: 6.2
  },
  {
    id: 'zone-6',
    name: 'Electronic City Phase 1',
    ward: 'Ward 193',
    sponsor: corporateSponsors[1],
    sponsorshipStart: '2023-07-01',
    sponsorshipEnd: '2025-06-30',
    coordinates: { x: 75, y: 85 },
    beforeMetrics: {
      wasteVolume: 520,
      cleanlinessScore: 42,
      landfillPercentage: 88
    },
    afterMetrics: {
      wasteVolume: 312,
      cleanlinessScore: 78,
      landfillPercentage: 35
    },
    verifications: [
      { id: 'v21', method: 'image_analysis', description: 'AI-powered visual inspection of collection points', verified: true, timestamp: '2024-01-10T07:45:00Z', confidence: 94 },
      { id: 'v22', method: 'collection_logs', description: 'GPS-tracked vehicle collection records', verified: true, timestamp: '2024-01-10T08:50:00Z', confidence: 98 },
      { id: 'v23', method: 'timestamp_route', description: 'Route completion and time validation', verified: true, timestamp: '2024-01-10T09:40:00Z', confidence: 96 },
      { id: 'v24', method: 'facility_intake', description: 'Processing facility weight verification', verified: true, timestamp: '2024-01-10T15:10:00Z', confidence: 99 }
    ],
    greenCoinsIssued: 2850,
    carbonReduction: 19.4
  }
];

export const esgSummary = {
  activeSponsors: corporateSponsors.length,
  sponsoredZones: sponsoredZones.length,
  totalWasteReduction: sponsoredZones.reduce((acc, zone) => 
    acc + (zone.beforeMetrics.wasteVolume - zone.afterMetrics.wasteVolume), 0),
  totalGreenCoins: corporateSponsors.reduce((acc, s) => acc + s.greenCoinsIssued, 0),
  totalCarbonReduction: sponsoredZones.reduce((acc, zone) => acc + zone.carbonReduction, 0),
  totalInvestment: corporateSponsors.reduce((acc, s) => acc + s.totalInvestment, 0),
  averageCleanlinessImprovement: Math.round(
    sponsoredZones.reduce((acc, zone) => 
      acc + (zone.afterMetrics.cleanlinessScore - zone.beforeMetrics.cleanlinessScore), 0) / sponsoredZones.length
  ),
  averageLandfillDiversion: Math.round(
    sponsoredZones.reduce((acc, zone) => 
      acc + (zone.beforeMetrics.landfillPercentage - zone.afterMetrics.landfillPercentage), 0) / sponsoredZones.length
  )
};
