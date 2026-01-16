import requests
import os

# Path to the user's file
IMAGE_PATH = r"C:\Users\Stavan\Downloads\download.jpg"
URL = "http://localhost:8000/waste-description/analyze-image/"

def test_analyze_image():
    if not os.path.exists(IMAGE_PATH):
        print(f"File not found: {IMAGE_PATH}")
        return

    print(f"Sending {IMAGE_PATH} to {URL}...")
    
    try:
        with open(IMAGE_PATH, "rb") as f:
            files = {"file": ("download.jpg", f, "image/jpeg")}
            response = requests.post(URL, files=files)
        
        print(f"Status Code: {response.status_code}")
        print("Response Body:")
        print(response.text)
    except Exception as e:
        print(f"Error sending request: {e}")

if __name__ == "__main__":
    test_analyze_image()
