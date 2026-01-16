# Sankalp AI 🌿🤖

**Sankalp AI** is an intelligent "Municipal Waste Management" platform that empowers cities to manage waste smarter, faster, and greener. 

By combining **Google Gemini 2.5 Flash** for waste analysis and **Solana Blockchain** for citizen rewards, Sankalp AI creates a complete ecosystem—from reporting garbage to automating collection strategies.

---

## 🚀 Key Features

### 1. 🧠 AI Waste Intelligence (Powered by Gemini 2.5 Flash)
*   **Instant Analysis**: Upload a photo of any garbage pile.
*   **Smart Classification**: Detects waste type (Plastic, Organic, E-Waste, etc.) and estimates volume/tonnage.
*   **Action Plans**: Auto-generates cleanup strategies (team size, equipment needed, safety protocols).
*   **Sustainability Scoring**: Calculates potential carbon reduction and landfill diversion.

### 2. 🌍 City Command Centre
*   **Live Maps**: Visualizes waste incidents across city wards using **TomTom Maps**.
*   **Real-time Tracking**: Monitor collection trucks and bin statuses.
*   **Forecasting**: Predict waste accumulation trends.

### 3. 🪙 Sankalp Green Rewards (Solana Blockchain)
*   **Incentivize Action**: Citizens earn **$SANKALP** tokens for verified waste reporting.
*   **Web3 Integration**: Seamlessly connect **Phantom Wallet** to claim rewards.
*   **Transparency**: All rewards are verified and recorded on-chain.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS + Shadcn UI
*   **Maps**: Leaflet + TomTom API
*   **Blockchain**: Solana Web3.js + Wallet Adapter

### Backend
*   **Framework**: FastAPI (Python)
*   **AI Model**: Google Gemini 2.5 Flash (via `langchain-google-genai`)
*   **API Documentation**: Swagger UI (Auto-generated)

---

## ⚙️ Local Setup Guide

Follow these steps to run the complete system locally.

### Prerequisites
*   Node.js & npm
*   Python 3.10+
*   Google AI Studio API Key (Free)
*   TomTom Maps API Key (Free)

### 1. Backend Setup
Navigate to the backend folder:
```bash
cd backend
```
*(Note: Actual path is inside `harsh/Autonomous-Hacks-harsh/backend` in this repo structure)*

Create a `.env` file:
```properties
GEMINI_API_KEY=your_google_ai_key_here
```

Install dependencies and run:
```bash
# Install packages (see pyproject.toml or requirements.txt)
pip install fastapi uvicorn google-generativeai langchain-google-genai python-dotenv python-multipart

# Start the server (runs on localhost:8000)
py main.py
```

### 2. Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend/municipal-pulse-main
```

Create a `.env` file:
```properties
VITE_TOMTOM_KEY=your_tomtom_key_here
```

Install dependencies and run:
```bash
npm install
npm run dev
# App will run on localhost:5173 or localhost:3000
```

---

## 📸 Screenshots
*(Add screenshots of your Command Centre and Waste Intelligence dashboard here)*

## 📄 License
This project is open-source under the MIT License.

---
**Built for the Future of Smart Cities. 🏙️✨**
