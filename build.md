# 🏗️ BUILD.md – Setup Guide for Wellness App

This document outlines the steps to build, run, and deploy the Wellness App, including:

- React.js frontend
- Spring Boot backend with PostgreSQL
- Python Flask server for ML
- Dockerized deployment
- Apple HealthKit integration (manual)

---

## 🖥️ 1. Prerequisites

Install the following:
- [Node.js](https://nodejs.org/)
- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Python 3.9+](https://www.python.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- Apple Developer Account (for HealthKit)

---

## ⚛️ 2. Frontend (React.js)

### 📁 Location:
`components/`

### ▶️ Run locally:
```bash
cd components
npm install
npm start
🔧 Env (optional):
Update axios URLs in components like SleepPrediction.js, Meal.js, etc.

☕ 3. Backend (Spring Boot + PostgreSQL)
📁 Location:
backend/

🔧 Configuration:
Edit application.properties to match your PostgreSQL credentials:

properties
Copy
Edit
spring.datasource.url=jdbc:postgresql://localhost:5432/wellness
spring.datasource.username=postgres
spring.datasource.password=your_password
▶️ Run locally:
bash
Copy
Edit
cd backend
mvn clean install
java -jar target/*.jar
🧠 4. Python ML Server (Flask)
📁 Location:
python-server/

▶️ Run locally:
bash
Copy
Edit
cd python-server
pip install -r requirements.txt
python app.py
🐳 5. Docker Setup (All Services)
🧱 Build Docker Images:
From root directory:

bash
Copy
Edit
# Build backend image
docker build -t wellness-backend ./backend

# Build frontend image
docker build -t wellness-frontend ./components

# Build Python ML service
docker build -t wellness-ml ./python-server
🚀 Run containers:
bash
Copy
Edit
docker-compose up
Ensure you have a docker-compose.yml that includes services for:

React app

Spring Boot + PostgreSQL

Python Flask

🍏 6. Apple HealthKit Integration (Manual)
Due to iOS restrictions, a supporting native app (HealthSyncApp) is required:

Repository: HealthSyncApp GitHub

iOS app pushes HealthKit data via HTTP POST to:

http
Copy
Edit
POST /api/devices/register
Web backend receives & stores data in the database

✅ 7. Final Notes
Port Mapping:

React: 3000

Spring Boot: 8080

Flask ML server: 5002

Use host.docker.internal when containers communicate across networks.

If deploying to cloud (e.g., AWS, Heroku), set environment variables for DB and API keys.

yaml
Copy
Edit

---

Would you like this saved as `BUILD.md` for download? I can generate and attach it for you.