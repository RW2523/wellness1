# Wellness App - Team 13 (Zenalam)

Welcome to the **Wellness App (Zenalam)** by Team 13 from UMass Amherst, Spring 2025. This full-stack wellness platform supports electronic wellness records (EWR), AI-driven insights, Apple HealthKit integration, and telehealth—all running in containerized microservices using Docker.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Docker Setup](#docker-setup)
6. [Running the Application](#running-the-application)
7. [Apple HealthKit Integration](#apple-healthkit-integration)
8. [Machine Learning Services](#machine-learning-services)
9. [Project Structure](#project-structure)
10. [Security & Compliance](#security--compliance)

---

## Project Overview

Zenalam is a digital health platform that empowers users to track their fitness, mental health, diet, and wellness metrics. The system offers real-time AI recommendations and supports telehealth consultations. Health data is synced from Apple devices using a companion iOS app.

---

## Features

* **User Authentication & Role Management**
* **Electronic Wellness Records (EWR)**
* **AI-Driven Wellness Insights**
* **Telehealth Video & Chat Consultations**
* **Meal Logging via AI-based Food Classification**
* **Calm Studio** with breathing, Surya Namaskar, and mental health assessments
* **Sleep Disorder Prediction using ML**
* **Apple HealthKit Integration** for real-time data sync

---

## Technology Stack

* **Frontend**: React.js + TailwindCSS (Dockerized, served via Nginx)
* **Backend**: Spring Boot (Java, REST APIs)
* **Database**: PostgreSQL (persistent storage)
* **Machine Learning**: Python Flask server (Sleep prediction + Food classifier)
* **Mobile Sync App**: Swift + HealthKit (HealthSyncApp)
* **Containerization**: Docker + Docker Compose

---

## Getting Started

### Prerequisites

* Docker & Docker Compose installed
* Node.js and npm (if running frontend separately)
* Java 17+ and Maven (if running backend separately)

### Clone Repositories

```bash
git clone https://github.com/RW2523/wellness1.git
git clone https://github.com/RW2523/HealthSyncApp.git
cd wellness1
```

---

## Docker Setup

### Directory Structure:

```
wellness1/
├── backend/       # Spring Boot App
├── frontend/      # React.js App
├── ml-service/    # Flask-based ML server
├── docker-compose.yml
```

### Build and Run

```bash
docker-compose up --build
```

This spins up:

* React frontend
* Spring Boot backend (API layer)
* PostgreSQL DB
* Flask ML server

---

## Running the Application

### React Frontend

```bash
cd frontend
npm install
npm start
```

Or access via Docker container at `http://localhost:3000` or `http://localhost` depending on config.

### Spring Boot Backend

```bash
cd backend
mvn clean install
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

Backend runs at `http://localhost:8080`

### PostgreSQL Database

Connected via `docker-compose`. Credentials set in `application.properties`:

```
spring.datasource.url=jdbc:postgresql://db:5432/wellness
spring.datasource.username=wellness_user
spring.datasource.password=securepassword
```

---

## Apple HealthKit Integration

The `HealthSyncApp` is a custom iOS app that collects and uploads data from HealthKit.

### Supported Metrics

* Steps
* Heart Rate
* Respiratory Rate
* Oxygen Saturation
* Walking Distance
* Water Intake
* Calories
* Active Energy

### How It Works

1. Install the [HealthSyncApp](https://github.com/RW2523/HealthSyncApp) on an iPhone.
2. Authorize HealthKit permissions.
3. Tap `Upload Health Data` to send data to the backend.
4. Backend receives and stores data in PostgreSQL.

> Note: Due to Apple’s restrictions, a paid developer account may be required for full HealthKit functionality.

---

## Machine Learning Services

### Sleep Disorder Prediction

* Model: Random Forest trained on Kaggle Sleep dataset
* Deployed via Flask API at `/api/auth/pred`
* Input: Age, BMI, Sleep Duration, etc.
* Output: Predicted condition (e.g., Insomnia)

### Food Image Classification

* Model: Vision Transformer (HuggingFace Transformers)
* Input: Food Image
* Output: Top 3 predicted food items

---

## Project Structure

```
frontend/               # React App (with Calm Studio, Dashboards, etc)
backend/                # Spring Boot REST APIs
ml-service/             # Python Flask service
HealthSyncApp/          # iOS app using HealthKit
postgres/               # Dockerized PostgreSQL DB
```

---

## API Documentation
```
Authentication
POST /api/auth/register — User registration

POST /api/auth/login — User login

Activity & Progress
GET /api/activities — Activity goals and progress

GET /api/overviews — Line chart monthly stats

GET /api/workout-distribution — Workout distribution

Meals & Classification
POST /api/auth/food — Upload food image

POST /api/auth/meals — Log a meal

POST /api/auth/mealslog — View meal logs

Sleep Prediction
POST /api/auth/pred — Sleep disorder prediction (structured features)

ML Service Endpoints (Flask)
POST /food — Food classification from image

POST /predict — Predict sleep disorder (encoded)
```

## Security & Compliance

* Passwords hashed with BCrypt
* MFA login implemented
* OAuth role-based access control
* SQL injection protection using prepared statements
* HIPAA/GDPR-compliant design considerations

---

## Maintainers

* Richard Watson (RW2523)
* Varun Palnati (vpalnati77)
* Murtaza Ujjainwala (murtaza-ujjainwala)
* Pramith Kiran (Pramith08)

---

## License

This project is for academic purposes (UMass Amherst CS 520, Spring 2025). Not licensed for commercial use.

---

## Resources

* [Main GitHub Repo](https://github.com/RW2523/wellness1)
* [HealthSyncApp Repo](https://github.com/RW2523/HealthSyncApp)
* [Apple HealthKit Docs](https://developer.apple.com/documentation/healthkit)
* [Docker Docs](https://docs.docker.com/)

---

Thank you for using Zenalam Wellness App!
