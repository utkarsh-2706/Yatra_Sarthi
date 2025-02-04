# Yatra_Sarthi
# 🌍 AI-Powered Travel Assistant ✈️  

An **AI-driven travel assistant** built with **TypeScript**, leveraging **GROQ API** for fast and efficient AI-powered recommendations. It helps travel agents provide **personalized trip suggestions**, automate workflows, and enhance customer engagement.  

## 🚀 Features  

✅ **AI-Powered Recommendations** – Personalized travel suggestions using **GROQ API**.  
✅ **Seamless Booking System** – Connects with major travel APIs.  
✅ **Automated Travel Planning** – Reduces manual effort with AI-driven workflows.  
✅ **Multi-Platform Support** – Works on web and mobile with a responsive UI.  
✅ **Data-Driven Insights** – AI-powered analytics to identify travel trends.  
✅ **Secure & Scalable** – Cloud-based architecture ensuring reliability.  

---

## 📥 Download & Live Prototype  

- 📲 **Download App**: [Click Here to Download](#https://appdata.freewebsitetoapp.co.in/app-data/free-apps/15317157198/GLLUxkrJJx/app-debug.apk)  
- 🎨 **Live Prototype**: [View Prototype](#https://chipper-kelpie-473620.netlify.app/)  

---

## 🛠️ Tech Stack  

- **Frontend**: React (TypeScript), TailwindCSS  
- **Backend**: Node.js (TypeScript), Express.js  
- **AI/ML**: **GROQ API**  
- **Cloud & DevOps**: AWS / Firebase Hosting  
- **APIs**: GROQ API, Google Places API  

---

## 🏗️ Installation & Setup  

Follow these steps to set up and run the project locally.  

### 🔹 Prerequisites  

- **Node.js** (>=16.0)  
- **Git**   
- **GROQ API Key**  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo-name.git  
cd your-repo-name
 ```
### 2️⃣ Install Dependencies
```sh

npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

```env
 
GROQ_API_KEY=your_groq_api_key
```
### 4️⃣ Run the Development Server
```sh

npm run dev
```
##5️⃣ Build for Production
```sh

npm run build
```
### 6️⃣ Start the Application
```sh

npm start
```  
📡 API Documentation
🔹 Get AI Recommendations
```http

GET /api/recommendations?userId=123
Response
```

```json

{
  "destinations": [
    { "name": "Bali", "score": 9.5 },
    { "name": "Paris", "score": 8.7 }
  ]
}
```
##🔹 Book a Trip
```http

POST /api/book
Request Body
```

```json
{
  "userId": "123",
  "destination": "Bali",
  "dates": ["2024-06-01", "2024-06-10"]
}
```
## Response

```json

{ "status": "success", "bookingId": "abc123" }
```
## 🤝 Contributing
We welcome contributions! Follow these steps:

## Fork the repository.
Create a new branch (feature-xyz).
Commit your changes (git commit -m "Add feature xyz").
Push to your branch (git push origin feature-xyz).
Create a Pull Request 🚀

## 📄 License
This project is licensed under the MIT License.

⭐ Star this repository if you find it useful!

📧 Contact us at aryansethiya111@gmail.com for queries.
