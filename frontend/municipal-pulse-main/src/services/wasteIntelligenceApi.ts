// API service for waste intelligence endpoints
const API_BASE = "http://127.0.0.1:8000";

// ============ TYPES ============

export interface IncidentLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface IncidentClassification {
  wasteType: string;
  estimatedVolume: {
    category: string;
    tonnageRange: string;
  };
  locationType: string;
}

export interface IncidentPriority {
  level: string;
  reasons: string[];
}

export interface RecommendationTeam {
  workers: number;
  skillTypes: string[];
}

export interface IncidentRecommendation {
  team: RecommendationTeam;
  equipment: string[];
  vehicles: string[];
}

export interface Incident {
  id: string;
  imageUrl: string;
  source: string;
  time: string;
  location: IncidentLocation;
  classification: IncidentClassification;
  priority: IncidentPriority;
  recommendation: IncidentRecommendation;
  status: string;
}

export interface IncidentResponse {
  incident: Incident;
}

export interface SolutionStep {
  step_no: number;
  action: string;
  description: string;
  eco_benefit: string;
  responsible_team: string;
}

export interface SolutionOutcomes {
  landfill_diversion_percent: number;
  estimated_carbon_reduction_kg: number;
  water_contamination_risk: string;
  overall_sustainability_score: number;
}

export interface SolutionMonitoring {
  progress_tracking: boolean;
  environmental_audit_required: boolean;
  compliance_checkpoints: number;
}

export interface Solution {
  solution_id: string;
  title: string;
  objective: string;
  strategy: {
    primary_focus: string;
    secondary_focus: string[];
  };
  steps: SolutionStep[];
  expected_outcomes: SolutionOutcomes;
  monitoring: SolutionMonitoring;
}

export interface SolutionResponse {
  solutions: Solution[];
}

// ============ API FUNCTIONS ============

/**
 * Analyzes a waste image and returns incident details
 * @param file - Image file (JPEG/PNG)
 * @returns Incident details
 */
export async function analyzeWasteImage(file: File): Promise<Incident> {
  try {
    console.log("🚀 [API] Uploading image:", file.name, file.size, "bytes");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE}/waste-description/analyze-image/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: IncidentResponse = await response.json();
    
    // Parse incident if it's a string (API returns stringified JSON)
    const incident = typeof data.incident === "string" 
      ? JSON.parse(data.incident) 
      : data.incident;
    
    console.log("✅ [API RESPONSE] Incident Analysis:", incident);
    console.log("📍 Location:", incident.location);
    console.log("🗑️ Classification:", incident.classification);
    console.log("⚠️ Priority:", incident.priority);
    console.log("👥 Recommendation:", incident.recommendation);
    console.log("📊 Full Response:", JSON.stringify(incident, null, 2));
    return incident;
  } catch (error) {
    console.error("❌ [API ERROR] Failed to analyze waste image:", error);
    throw error;
  }
}

/**
 * Generates waste management solutions based on incident data
 * @param incident - The incident object from analyze-image response
 * @returns Array of optimized solutions
 */
export async function generateWasteSolutions(incident: Incident): Promise<Solution[]> {
  try {
    console.log("🚀 [API] Generating solutions for incident:", incident.id);
    console.log("📤 [API REQUEST] Sending incident:", JSON.stringify(incident, null, 2));
    
    const response = await fetch(`${API_BASE}/waste-management/generate-solutions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_json: incident,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: SolutionResponse = await response.json();
    console.log("✅ [API RESPONSE] Solutions Generated:", data.solutions);
    console.log("📊 Number of solutions:", data.solutions?.length || 0);
    data.solutions?.forEach((sol: any, idx: number) => {
      console.log(`\n🔧 Solution ${idx + 1}:`, sol.title);
      console.log("  Objective:", sol.objective);
      console.log("  Steps:", sol.steps?.length || 0);
      console.log("  Expected Outcomes:", sol.expected_outcomes);
      console.log("  Full Solution:", JSON.stringify(sol, null, 2));
    });
    return data.solutions || [];
  } catch (error) {
    console.error("❌ [API ERROR] Failed to generate solutions:", error);
    throw error;
  }
}

/**
 * Legacy function for backwards compatibility
 * Generates solutions based on waste type and severity
 */
export async function getWasteSolutions(wasteType: string, severity: number, quantity: number): Promise<Solution[]> {
  try {
    // Create a mock incident object for the legacy call
    const mockIncident: Incident = {
      id: `legacy_${Date.now()}`,
      imageUrl: "",
      source: "Legacy API",
      time: new Date().toISOString(),
      location: {
        address: "Ahmedabad, India",
        lat: 23.0225,
        lng: 72.5714,
      },
      classification: {
        wasteType: wasteType,
        estimatedVolume: {
          category: severity > 7 ? "Large" : severity > 4 ? "Medium" : "Small",
          tonnageRange: `${quantity}kg`,
        },
        locationType: "Public Area",
      },
      priority: {
        level: severity > 7 ? "High" : severity > 4 ? "Medium" : "Low",
        reasons: [`Severity level: ${severity}`],
      },
      recommendation: {
        team: {
          workers: severity > 7 ? 4 : 2,
          skillTypes: ["Waste Management"],
        },
        equipment: ["Standard equipment"],
        vehicles: ["Truck"],
      },
      status: "pending",
    };

    return generateWasteSolutions(mockIncident);
  } catch (error) {
    console.error("Failed to fetch solutions:", error);
    return getFallbackSolutions(wasteType, severity);
  }
}

// Fallback solutions if API is not available
function getFallbackSolutions(wasteType: string, severity: number): Solution[] {
  if (severity >= 8) {
    return [
      {
        id: "sol_1",
        action: "Emergency hazardous waste pickup",
        estimated_time_minutes: 30,
        required_equipment: ["PPE kit", "Hazmat container", "Truck"],
        estimated_cost_rupees: 2500,
        success_probability: 0.95,
      },
    ];
  } else if (severity >= 6) {
    return [
      {
        id: "sol_2",
        action: "Standard waste collection and segregation",
        estimated_time_minutes: 45,
        required_equipment: ["Truck", "Segregation bins", "Gloves"],
        estimated_cost_rupees: 1200,
        success_probability: 0.92,
      },
      {
        id: "sol_3",
        action: "Enhanced collection with contamination check",
        estimated_time_minutes: 60,
        required_equipment: ["Truck", "Testing kit", "PPE"],
        estimated_cost_rupees: 1500,
        success_probability: 0.98,
      },
    ];
  } else {
    return [
      {
        id: "sol_4",
        action: "Scheduled routine collection",
        estimated_time_minutes: 90,
        required_equipment: ["Standard truck", "Bins"],
        estimated_cost_rupees: 800,
        success_probability: 0.88,
      },
      {
        id: "sol_5",
        action: "Schedule for next collection cycle",
        estimated_time_minutes: 1440,
        required_equipment: ["Standard truck"],
        estimated_cost_rupees: 500,
        success_probability: 0.85,
      },
    ];
  }
}
