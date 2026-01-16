export interface Incident {
  id: string;
  imageUrl: string;
  source: string;
  time: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  classification: {
    wasteType: string;
    estimatedVolume: {
      category: "Small" | "Medium" | "Large";
      tonnageRange: string;
    };
    locationType: string;
  };
  priority: {
    level: "Low" | "Medium" | "High";
    reasons: string[];
  };
  recommendation: {
    team: {
      workers: number;
      skillTypes: string[];
    };
    equipment: string[];
    vehicles: string[];
  };
  status: "pending" | "reviewed" | "dispatched";
}

export const dummyIncidents: Incident[] = [
  {
    id: "INC-001",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop",
    source: "CCTV Camera",
    time: "10:32 AM",
    location: {
      address: "MG Road, Sector 7, Near City Mall, Indore - 452001",
      lat: 22.7196,
      lng: 75.8577
    },
    classification: {
      wasteType: "Mixed garbage with organic matter",
      estimatedVolume: { category: "Large", tonnageRange: "2-5 tons" },
      locationType: "Main road / Commercial"
    },
    priority: {
      level: "High",
      reasons: ["Large waste volume detected", "High-traffic commercial area", "Public health risk", "Near food establishments"]
    },
    recommendation: {
      team: { workers: 8, skillTypes: ["Manual workers", "Machine operator", "Supervisor"] },
      equipment: ["Brooms", "Shovels", "PPE (gloves, masks)", "JCB/Bobcat", "Water tanker"],
      vehicles: ["Tipper truck", "Compactor", "Water tanker"]
    },
    status: "pending"
  },
  {
    id: "INC-002",
    imageUrl: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=400&fit=crop",
    source: "Citizen Report",
    time: "09:15 AM",
    location: {
      address: "Vijay Nagar, AB Road, Behind Bombay Hospital, Indore - 452010",
      lat: 22.7533,
      lng: 75.8937
    },
    classification: {
      wasteType: "Plastic and packaging waste",
      estimatedVolume: { category: "Medium", tonnageRange: "0.5-2 tons" },
      locationType: "Residential area"
    },
    priority: {
      level: "Medium",
      reasons: ["Moderate waste accumulation", "Residential proximity", "Recyclable materials present"]
    },
    recommendation: {
      team: { workers: 4, skillTypes: ["Manual workers", "Driver"] },
      equipment: ["Brooms", "Shovels", "PPE (gloves, masks)", "Wheelbarrows"],
      vehicles: ["Small pickup truck"]
    },
    status: "reviewed"
  },
  {
    id: "INC-003",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    source: "Field Officer",
    time: "08:45 AM",
    location: {
      address: "Rajwada Palace Area, Old City, Indore - 452002",
      lat: 22.7179,
      lng: 75.8564
    },
    classification: {
      wasteType: "General debris and litter",
      estimatedVolume: { category: "Small", tonnageRange: "< 0.5 tons" },
      locationType: "Tourist / Heritage zone"
    },
    priority: {
      level: "High",
      reasons: ["Heritage site", "Tourist area", "City image concern"]
    },
    recommendation: {
      team: { workers: 3, skillTypes: ["Manual workers"] },
      equipment: ["Brooms", "Bags", "Basic PPE"],
      vehicles: ["Auto-rickshaw pickup"]
    },
    status: "dispatched"
  },
  {
    id: "INC-004",
    imageUrl: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=400&h=400&fit=crop",
    source: "CCTV Camera",
    time: "11:20 AM",
    location: {
      address: "Sarafa Bazaar, Near Cloth Market, Indore - 452002",
      lat: 22.7185,
      lng: 75.8542
    },
    classification: {
      wasteType: "Food waste and organic matter",
      estimatedVolume: { category: "Large", tonnageRange: "3-6 tons" },
      locationType: "Market area"
    },
    priority: {
      level: "High",
      reasons: ["Large organic waste", "Market hygiene critical", "Pest attraction risk", "Public health hazard"]
    },
    recommendation: {
      team: { workers: 10, skillTypes: ["Manual workers", "Machine operator", "Supervisor", "Hazmat trained"] },
      equipment: ["Brooms", "Shovels", "PPE", "JCB", "Disinfectant sprayer"],
      vehicles: ["Tipper truck x2", "Water tanker", "Compactor"]
    },
    status: "pending"
  },
  {
    id: "INC-005",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=400&fit=crop",
    source: "Citizen Report",
    time: "07:30 AM",
    location: {
      address: "Palasia Square, RNT Marg, Indore - 452001",
      lat: 22.7241,
      lng: 75.8819
    },
    classification: {
      wasteType: "Construction and demolition waste",
      estimatedVolume: { category: "Large", tonnageRange: "5-10 tons" },
      locationType: "Commercial / Construction site"
    },
    priority: {
      level: "Medium",
      reasons: ["C&D waste accumulation", "Traffic obstruction potential", "Requires heavy equipment"]
    },
    recommendation: {
      team: { workers: 6, skillTypes: ["Machine operator", "Manual workers", "Traffic controller"] },
      equipment: ["JCB/Bobcat", "Shovels", "Safety cones", "PPE"],
      vehicles: ["Dumper truck", "Tipper truck"]
    },
    status: "pending"
  },
  {
    id: "INC-006",
    imageUrl: "https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2?w=400&h=400&fit=crop",
    source: "Field Officer",
    time: "06:15 AM",
    location: {
      address: "Khajrana Temple Road, Near Khajrana Ganesh Temple, Indore - 452016",
      lat: 22.7389,
      lng: 75.9012
    },
    classification: {
      wasteType: "Religious and floral waste",
      estimatedVolume: { category: "Medium", tonnageRange: "1-2 tons" },
      locationType: "Religious site"
    },
    priority: {
      level: "High",
      reasons: ["Religious site sensitivity", "Daily devotee footfall", "Organic decomposition risk"]
    },
    recommendation: {
      team: { workers: 5, skillTypes: ["Manual workers", "Driver"] },
      equipment: ["Brooms", "Collection bags", "Gloves", "Wheelbarrows"],
      vehicles: ["Small pickup truck", "Auto-rickshaw"]
    },
    status: "reviewed"
  },
  {
    id: "INC-007",
    imageUrl: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=400&h=400&fit=crop",
    source: "CCTV Camera",
    time: "12:45 PM",
    location: {
      address: "Treasure Island Mall Parking, MG Road, Indore - 452001",
      lat: 22.7215,
      lng: 75.8612
    },
    classification: {
      wasteType: "Plastic bottles and packaging",
      estimatedVolume: { category: "Small", tonnageRange: "< 0.3 tons" },
      locationType: "Commercial / Parking"
    },
    priority: {
      level: "Low",
      reasons: ["Small volume", "Contained area", "Recyclable materials"]
    },
    recommendation: {
      team: { workers: 2, skillTypes: ["Manual workers"] },
      equipment: ["Brooms", "Collection bags", "Basic PPE"],
      vehicles: ["Auto-rickshaw pickup"]
    },
    status: "dispatched"
  },
  {
    id: "INC-008",
    imageUrl: "https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?w=400&h=400&fit=crop",
    source: "Citizen Report",
    time: "02:30 PM",
    location: {
      address: "ISBT Bus Stand, Gangwal Bus Stand, Indore - 452001",
      lat: 22.7156,
      lng: 75.8789
    },
    classification: {
      wasteType: "Mixed urban waste",
      estimatedVolume: { category: "Medium", tonnageRange: "1-3 tons" },
      locationType: "Transport hub"
    },
    priority: {
      level: "High",
      reasons: ["High footfall area", "Public transport hub", "City gateway image", "Continuous waste generation"]
    },
    recommendation: {
      team: { workers: 6, skillTypes: ["Manual workers", "Supervisor", "Driver"] },
      equipment: ["Brooms", "Dustbins", "Wheelbarrows", "PPE"],
      vehicles: ["Compactor", "Small pickup"]
    },
    status: "pending"
  },
  {
    id: "INC-009",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=400&fit=crop",
    source: "Field Officer",
    time: "04:00 PM",
    location: {
      address: "Nehru Park, Race Course Road, Indore - 452003",
      lat: 22.7298,
      lng: 75.8456
    },
    classification: {
      wasteType: "Garden waste and litter",
      estimatedVolume: { category: "Small", tonnageRange: "0.2-0.5 tons" },
      locationType: "Public park"
    },
    priority: {
      level: "Low",
      reasons: ["Routine maintenance", "Non-hazardous", "Contained within park"]
    },
    recommendation: {
      team: { workers: 2, skillTypes: ["Manual workers"] },
      equipment: ["Rakes", "Bags", "Gloves"],
      vehicles: ["Auto-rickshaw"]
    },
    status: "reviewed"
  },
  {
    id: "INC-010",
    imageUrl: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=400&h=400&fit=crop",
    source: "CCTV Camera",
    time: "05:45 PM",
    location: {
      address: "Holkar Stadium Road, Near Stadium Gate 2, Indore - 452001",
      lat: 22.7267,
      lng: 75.8634
    },
    classification: {
      wasteType: "Event waste - food containers",
      estimatedVolume: { category: "Large", tonnageRange: "4-8 tons" },
      locationType: "Sports venue / Event area"
    },
    priority: {
      level: "High",
      reasons: ["Post-event cleanup required", "Large volume", "Public health priority", "High visibility area"]
    },
    recommendation: {
      team: { workers: 12, skillTypes: ["Manual workers", "Machine operator", "Supervisor", "Drivers"] },
      equipment: ["Brooms", "Shovels", "Large bins", "PPE", "Wheelbarrows"],
      vehicles: ["Compactor x2", "Tipper truck", "Water tanker"]
    },
    status: "pending"
  }
];
