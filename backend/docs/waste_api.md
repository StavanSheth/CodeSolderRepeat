# Waste Management API Documentation

This document describes the API endpoints for integrating the backend waste management system with a frontend application.

## Base URL

```
http://localhost:8000
```

---

## 1. Analyze Waste Image

**Endpoint:** `/waste-description/analyze-image/`

**Method:** `POST`

**Description:**
Uploads an image and returns a JSON object describing the waste incident.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `file`: Image file (JPEG/PNG)

**Response:**
- 200 OK
- JSON object with incident details (see below)

**Example Request (JavaScript):**
```js
const formData = new FormData();
formData.append('file', imageFile);
fetch('http://localhost:8000/waste-description/analyze-image/', {
  method: 'POST',
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Example Response:**
```json
{
  "incident": {
    "id": "...",
    "imageUrl": "...",
    "source": "Citizen Report",
    "time": "...",
    "location": { "address": "...", "lat": 0, "lng": 0 },
    "classification": { "wasteType": "...", "estimatedVolume": { "category": "Small", "tonnageRange": "..." }, "locationType": "..." },
    "priority": { "level": "High", "reasons": ["..."] },
    "recommendation": { "team": { "workers": 2, "skillTypes": ["..."] }, "equipment": ["..."], "vehicles": ["..."] },
    "status": "pending"
  }
}
```

---

## 2. Generate Waste Management Solutions

**Endpoint:** `/waste-management/generate-solutions/`

**Method:** `POST`

**Description:**
Generates up to 4 optimized solutions for waste management based on input data.

**Request:**
- Content-Type: `application/json`
- Body:
  - `input_json`: Waste incident data (object)

**Example Request (JavaScript):**
```js
fetch('http://localhost:8000/waste-management/generate-solutions/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input_json: { /* incident object */ } })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response:**
- 200 OK
- JSON object with solutions list

**Example Response:**
```json
{
  "solutions": [
    {
      "solution_id": "...",
      "title": "...",
      "objective": "...",
      "strategy": { "primary_focus": "...", "secondary_focus": ["..."] },
      "steps": [ { "step_no": 1, "action": "...", "description": "...", "eco_benefit": "...", "responsible_team": "..." } ],
      "expected_outcomes": { "landfill_diversion_percent": 80, "estimated_carbon_reduction_kg": 100, "water_contamination_risk": "low", "overall_sustainability_score": 90 },
      "monitoring": { "progress_tracking": true, "environmental_audit_required": false, "compliance_checkpoints": 3 }
    }
  ]
}
```

---

## Error Handling
- All endpoints return HTTP 500 with a JSON error message on failure.

---

## Notes
- Ensure the backend server is running and accessible from the frontend.
- For image analysis, use JPEG/PNG files.
- For solution generation, use the incident object returned from the image analysis endpoint.
