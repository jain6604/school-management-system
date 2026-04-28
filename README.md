# 🎓 Student Performance Intelligence System
### *Modern School Management & Analytics Platform*

[![.NET Core](https://img.shields.io/badge/Backend-ASP.NET%20Core%209.0-512bd4?style=flat-square&logo=.net)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/Frontend-React%2019-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479a1?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📌 Overview

The **Student Performance Intelligence System** (formerly Nova Crest Academy) is a comprehensive full-stack solution designed to revolutionize school administration and academic tracking. By leveraging real-time data analytics and a robust REST API, the system empowers educators to monitor student progress, predict academic outcomes (CGPA), and proactively identify students needing additional support.

---

## 🚀 Tech Stack

| Layer | Technology | Key Usage |
| :--- | :--- | :--- |
| **Frontend** | React 19, Framer Motion | Dynamic UI, Glassmorphism, Neon Aesthetics |
| **Backend** | ASP.NET Core (C#) | High-performance RESTful API & Business Logic |
| **Bridge** | Node.js / Express | Lightweight MySQL communication bridge |
| **Database** | MySQL | Relational data storage for Students, Staff, and Fees |
| **Styling** | Vanilla CSS / Tailwind | Modern responsive design with smooth transitions |

---

## ✨ Features

### 🏫 Administrative Modules
* **SIS (Student Information System):** Centralized database for student profiles, addresses, and parent details.
* **Admission Management:** Digital portal for handling new student registrations and merit-based processing.
* **Staff Records:** Management of teaching and administrative personnel details.
* **Fee Management:** Automated fee tracking and status monitoring.

### 📈 Academic Intelligence
* **CGPA Prediction System:** Algorithmic forecasting of student performance based on historical marks.
* **Risk Detection:** Intelligent identification of "at-risk" students with low-performing trends.
* **Analytics Dashboard:** Real-time visualization of average scores, attendance trends, and class metrics.
* **Exams & Results:** Digital record-keeping for examination schedules and student results.

### 🚌 Campus Services
* **Notice Board:** Real-time updates for school-wide announcements.
* **Timetable Management:** Dynamic scheduling for classes and staff assignments.
* **Bus & Alumni Services:** Integrated tracking for school transport and alumni networking.

---

## 📁 Project Structure

```bash
├── backend-bridge/   # Node.js API Bridge for MySQL connection
├── database/         # SQL Setup scripts (setup.sql)
└── frontend/         # Core React Application & StudentAPI (.NET)
    ├── src/          # React Source (Pages, Components)
    ├── Controllers/  # ASP.NET API Controllers
    └── Models/       # C# Data Models (Student, Marks, etc.)
```

---

## ⚙️ How to Run

### 1️⃣ Database Setup
1. Open **MySQL Workbench**.
2. Execute the script at `database/setup.sql` to initialize the database and tables.

### 2️⃣ Backend Bridge (Optional/Node)
If using the Node.js bridge for the presentation:
1. `cd backend-bridge`
2. `npm install`
3. `npm start`

### 3️⃣ Main Backend (ASP.NET Core)
1. Open `frontend/StudentAPI.csproj` in **Visual Studio**.
2. Run the project using `F5` to start the REST API.

### 4️⃣ Frontend UI
1. Open a terminal in the `frontend/` folder.
2. `npm install`
3. `npm start`
4. Access the portal at `http://localhost:3000`.

---

## 📊 Future Roadmap

- [ ] **ML Integration:** Deploy a Scikit-learn model for advanced GPA forecasting.
- [ ] **Cloud Deployment:** Host the system on AWS/Azure with Docker containers.
- [ ] **Mobile App:** Develop a React Native version for parents and students.

---

## 👨‍💻 Author

**Saksham Jain**  
*Lead Developer & Architect*

