import requests
from requests.auth import HTTPBasicAuth

auth_url = "http://api.tbotechnology.in/TBOHolidays_HotelAPI/Search"
credentials = {
    "UserName": "hackathontest",
    "Password": "Hac@98910186"
}

response = requests.post(auth_url, json=credentials, auth=HTTPBasicAuth('hackathontest', 'Hac@98910186'))

if response.status_code == 200:
    token = response.json().get("Token")
    print(f"Authenticated! Token: {token}")
else:
    print("Authentication failed:", response.text)
