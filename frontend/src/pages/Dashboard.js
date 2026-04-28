import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    staff: 0,
    avgScore: 0
  });

  useEffect(() => {
    // Fetch live data from the DBMS Bridge
    const fetchStats = async () => {
      try {
        const studentRes = await fetch('http://localhost:5104/api/students');
        const students = await studentRes.json();
        
        const staffRes = await fetch('http://localhost:5104/api/staff');
        const staff = await staffRes.json();

        const feeRes = await fetch('http://localhost:5104/api/fees');
        const fees = await feeRes.json();
        const pendingFees = fees.filter(f => f.Status !== 'Paid').length;

        const analyticsRes = await fetch('http://localhost:5104/api/analytics/marks');
        const analytics = await analyticsRes.json();
        const avg = analytics.length > 0 ? (analytics.reduce((acc, curr) => acc + parseFloat(curr.AverageScore), 0) / analytics.length).toFixed(1) : 0;

        setStats({
          students: students.length,
          staff: staff.length,
          avgScore: avg,
          pendingFees: pendingFees
        });
      } catch (err) {
        console.error("Error fetching DBMS stats:", err);
      }
    };

    fetchStats();
  }, []);

  const menuItems = [
    { title: "Student Management", icon: "🎓", path: "/sis", color: "#38bdf8" },
    { title: "Admission Desk", icon: "📝", path: "/admission-dashboard", color: "#818cf8" },
    { title: "Staff Directory", icon: "👨‍🏫", path: "/staff", color: "#c084fc" },
    { title: "Fee Portal", icon: "💳", path: "/fee", color: "#fb7185" },
    { title: "Academic Marks", icon: "📊", path: "/marks", color: "#fbbf24" },
    { title: "DBMS Analytics", icon: "🔍", path: "/analytics", color: "#4ade80" },
  ];

  return (
    <div style={container}>
      {/* Sidebar/Header area */}
      <header style={header}>
        <div style={logoSection}>
          <h1 className="gradient-text" style={logo}>NOVA CREST</h1>
          <p style={subLogo}>DBMS CORE SYSTEM</p>
        </div>
        <button style={logoutBtn} onClick={() => navigate("/")}>Logout</button>
      </header>

      <main style={main}>
        {/* Stat Cards */}
        <div style={statsGrid}>
          <StatCard title="Total Students" value={stats.students} icon="👥" color="#38bdf8" />
          <StatCard title="Active Staff" value={stats.staff} icon="👔" color="#818cf8" />
          <StatCard title="Avg. Score" value={`${stats.avgScore}%`} icon="📈" color="#4ade80" />
          <StatCard title="Pending Fees" value={stats.pendingFees} icon="⚠️" color="#fb7185" />
        </div>

        {/* Navigation Grid */}
        <h2 style={sectionTitle}>System Modules</h2>
        <div style={grid}>
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card"
              style={{ ...card, borderLeft: `4px solid ${item.color}` }}
              onClick={() => navigate(item.path)}
            >
              <span style={cardIcon}>{item.icon}</span>
              <h3 style={cardTitle}>{item.title}</h3>
              <p style={cardDesc}>Manage {item.title.toLowerCase()} records in DBMS.</p>
            </motion.div>
          ))}
        </div>

        {/* DBMS Insights Section */}
        <div className="glass-card" style={insightsSection}>
          <h3 style={insightsTitle}>⚡ DBMS Live Insights</h3>
          <p style={insightsText}>
            Direct MySQL connection established. Querying <code>Students</code>, <code>Attendance</code>, and <code>Marks</code> tables in real-time.
          </p>
          <div style={dbTag}>MySQL 8.0</div>
          <div style={dbTag}>Express Bridge</div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="glass-card" style={statCard}>
      <div style={{ ...iconCircle, backgroundColor: `${color}20`, color: color }}>{icon}</div>
      <div>
        <p style={statLabel}>{title}</p>
        <h3 style={statValue}>{value}</h3>
      </div>
    </div>
  );
}

// --- Styles ---

const container = {
  minHeight: "100vh",
  padding: "20px 40px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 0",
  marginBottom: "40px",
};

const logoSection = {
  display: "flex",
  flexDirection: "column",
};

const logo = {
  fontSize: "32px",
  fontWeight: "800",
  letterSpacing: "-1px",
};

const subLogo = {
  fontSize: "12px",
  color: "var(--text-secondary)",
  letterSpacing: "3px",
  marginTop: "-5px",
};

const main = {
  display: "flex",
  flexDirection: "column",
  gap: "40px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const statCard = {
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const iconCircle = {
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const statLabel = {
  fontSize: "14px",
  color: "var(--text-secondary)",
};

const statValue = {
  fontSize: "24px",
  fontWeight: "700",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "-20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
};

const card = {
  padding: "30px",
  cursor: "pointer",
  transition: "0.3s",
};

const cardIcon = {
  fontSize: "32px",
  display: "block",
  marginBottom: "15px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "8px",
};

const cardDesc = {
  fontSize: "14px",
  color: "var(--text-secondary)",
  lineHeight: "1.5",
};

const insightsSection = {
  padding: "30px",
  marginTop: "20px",
  textAlign: "center",
};

const insightsTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "10px",
};

const insightsText = {
  fontSize: "14px",
  color: "var(--text-secondary)",
  marginBottom: "20px",
};

const dbTag = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "20px",
  background: "var(--glass-border)",
  fontSize: "12px",
  margin: "0 5px",
};

const logoutBtn = {
  padding: "10px 20px",
  background: "transparent",
  border: "1px solid var(--glass-border)",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
};

export default Dashboard;