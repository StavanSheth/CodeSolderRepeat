import google.generativeai as genai
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

PROMPT_TEXT = f"""
You are an urban sanitation AI agent.

Analyze the provided image and return ONLY a valid JSON object that strictly follows this TypeScript interface:

interface Incident {{
  id: string;
  imageUrl: string;
  source: string;
  time: string;
  location: {{
    address: string;
    lat: number;
    lng: number;
  }};
  classification: {{
    wasteType: string;
    estimatedVolume: {{
      category: "Small" | "Medium" | "Large";
      tonnageRange: string;
    }};
    locationType: string;
    description: string;
  }};
  priority: {{
    level: "Low" | "Medium" | "High";
    reasons: string[];
  }};
  recommendation: {{
    team: {{
      workers: number;
      skillTypes: string[];
    }};
    equipment: string[];
    vehicles: string[];
  }};
  status: "pending" | "reviewed" | "dispatched";
}}

Rules:
- Respond ONLY with JSON.
- No explanation, no markdown.
- Infer realistic values based on the image.
- Use "Citizen Report" as source.
- Generate a new unique id.
- Use current local time: {datetime.now().strftime("%I:%M %p")}
- If location is not visible, produce a realistic Indian city location.
- Priority must be logically justified.
- Recommendations must match the waste type & scale.
"""

def analyze_image(image_path):
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    with open(image_path, "rb") as image_file:
         image_data = image_file.read()
         
    image_part = {
        "mime_type": "image/jpeg",
        "data": image_data
    }

    response = model.generate_content([PROMPT_TEXT, image_part])
    
    # Extract JSON string from potential markdown backticks
    content = response.text
    if "```json" in content:
        content = content.replace("```json", "").replace("```", "")
    elif "```" in content:
        content = content.replace("```", "")
        
    return content.strip()

# 🚀 Run
if __name__ == "__main__":
    image_path = "./image.png"
    # Ensure dummy image exists for testing if running directly
    if not os.path.exists(image_path):
        import shutil
        # Create a dummy file if needed or handle error
        print(f"Error: {image_path} not found for testing.")
    else:
        incident_json = analyze_image(image_path)
        print("\n📦 Generated Incident Object:\n")
        print(incident_json)
