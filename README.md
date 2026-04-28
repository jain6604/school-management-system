# Nova Crest Academy: DBMS Project Guide

Welcome to the **Nova Crest Academy** Digital Ecosystem. This project is optimized for a DBMS presentation.

## 🚀 Setup Instructions

### 1. Database (MySQL Workbench)
- Open **MySQL Workbench**.
- Run the script located at: `database/setup.sql`.
- This will create the `NovaCrestDB` database with all tables, sample data, and complex queries for your presentation.

### 2. Backend Bridge (Node.js)
The frontend needs this bridge to talk to MySQL.
- Open a terminal in `backend-bridge/`.
- Run: `npm start`.
- *Note: Ensure your MySQL credentials in `.env` are correct (default is root/jain6604).*

### 3. Frontend (React)
- Open a terminal in `frontend/`.
- Run: `npm start`.
- Navigate to the **Dashboard** to see the live records.

## 📊 DBMS Presentation Highlights
- **Live Data**: The dashboard fetches student counts and performance metrics directly from MySQL.
- **SIS Module**: Shows the `Students` table records.
- **Analytics Module**: Shows the result of an `AVG` and `GROUP BY` query, demonstrating complex data handling.
- **Premium UI**: Uses Glassmorphism and modern typography to make a lasting impression on "Mam".

---
*Developed by DBMS Project Architect*
