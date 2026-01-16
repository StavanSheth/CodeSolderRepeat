import json
from typing import List, Literal
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
import os

load_dotenv()

# Check for API Key
if not os.getenv("GEMINI_API_KEY"):
    print("WARNING: GEMINI_API_KEY not found in .env. AI features will not work.")


# =======================
# 🧱 Pydantic Models
# =======================

class Strategy(BaseModel):
    primary_focus: str
    secondary_focus: List[str]


class Step(BaseModel):
    step_no: int
    action: str
    description: str
    eco_benefit: str
    responsible_team: str


class ExpectedOutcomes(BaseModel):
    landfill_diversion_percent: int = Field(ge=0, le=100)
    estimated_carbon_reduction_kg: int = Field(ge=0)
    water_contamination_risk: Literal["low", "medium", "high"]
    overall_sustainability_score: int = Field(ge=0, le=100)


class Monitoring(BaseModel):
    progress_tracking: bool
    environmental_audit_required: bool
    compliance_checkpoints: int


class Solution(BaseModel):
    solution_id: str
    title: str
    objective: str
    strategy: Strategy
    steps: List[Step]
    expected_outcomes: ExpectedOutcomes
    monitoring: Monitoring


class SolutionList(BaseModel):
    solutions: List[Solution]


# =======================
# 🧠 LLM + Chain
# =======================

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.2,
    google_api_key=os.getenv("GEMINI_API_KEY", "dummy_key_for_startup")
)

parser = PydanticOutputParser(pydantic_object=SolutionList)

prompt = ChatPromptTemplate.from_messages([
    ("system", """
You are an AI Municipal Waste Planning Engine.

Generate up to 4 environmentally optimized solutions
based on the provided waste data.

{format_instructions}
"""),
    ("user", "{input_data}")
])

chain = prompt | llm | parser


# =======================
# 🚀 Execution
# =======================

def generate_solutions(input_json: dict) -> SolutionList:
    return chain.invoke({
        "input_data": json.dumps(input_json, indent=2),
        "format_instructions": parser.get_format_instructions()
    })


# =======================
# 🧪 Example Run
# =======================

if __name__ == "__main__":
    with open("./core/waste_input.json") as f:
        input_data = json.load(f)

    result = generate_solutions(input_data)

    print("\n===== GENERATED SOLUTIONS =====\n")
    for i, sol in enumerate(result.solutions, 1):
        print(f"Solution {i}: {sol}")
        print(f"Sustainability Score: {sol.expected_outcomes.overall_sustainability_score}\n")
