import time
import requests
import random
import json
from datetime import datetime

# Configuration
BACKEND_URL = "http://localhost:8000/sensors"
TARGET_BIN_ID = 12  # The active bin ID

def generate_mock_data():
    """
    Generates mock data in the format:
    [bin_id, lid_state, weight_kg_x1000, ammonia_ppm_x10, fill_level_pct]
    lid_state: 1 (Closed), 2 (Open)
    """
    lid_state = random.choice([1, 2])
    
    # Weight between 0.5kg and 20kg (500 to 20000)
    weight_raw = random.randint(500, 20000)
    
    # Ammonia between 0.0 and 50.0 ppm (0 to 500)
    ammonia_raw = random.randint(0, 500)
    
    # Fill level 0-100%
    fill_level = random.randint(0, 100)
    
    return [TARGET_BIN_ID, lid_state, weight_raw, ammonia_raw, fill_level]

def send_data(raw_data):
    try:
        # Convert list to JSON payload expected by backend
        payload = {
            "bin_id": raw_data[0],
            "lid_state": raw_data[1],
            "weight": raw_data[2],
            "ammonia": raw_data[3],
            "fill_level": raw_data[4]
        }
        
        response = requests.post(BACKEND_URL, json=payload)
        if response.status_code == 200:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Data sent successfully: {raw_data}")
            print(f"  -> Response: {response.json()}")
        else:
            print(f"Error sending data: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"Connection error: {e}")

def main():
    print(f"Starting Arduino Bridge for Bin ID {TARGET_BIN_ID}...")
    print(f"Target Backend: {BACKEND_URL}")
    print("Press Ctrl+C to stop.")
    
    while True:
        # Simulate reading from Arduino
        raw_data = generate_mock_data()
        
        # Send to backend
        send_data(raw_data)
        
        # Wait for 2 seconds before next reading
        time.sleep(2)

if __name__ == "__main__":
    main()
