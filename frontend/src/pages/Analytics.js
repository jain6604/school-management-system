import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5104/api/analytics/marks")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={container}>
      <header style={header}>
        <h1 className="gradient-text" style={title}>DBMS Analytics</h1>
        <p style={subtitle}>Live Performance Insights from MySQL</p>
      </header>

      <div style={analyticsGrid}>
        {loading ? (
          <p style={msg}>Analyzing DBMS records...</p>
        ) : (
          data.length > 0 ? data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
              style={analyticsCard}
            >
              <h3 style={subjectTitle}>{item.Subject}</h3>
              <div style={progressBg}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.AverageScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ ...progressFill, backgroundColor: getProgressColor(item.AverageScore) }}
                />
              </div>
              <p style={scoreText}>{item.AverageScore}% Average Score</p>
            </motion.div>
          )) : (
            <p style={msg}>No analytics data available in DBMS.</p>
          )
        )}
      </div>

      <div className="glass-card" style={querySection}>
        <h3 style={queryTitle}>Executed Query</h3>
        <code style={code}>
          SELECT Subject, AVG(Score) as AverageScore FROM Marks GROUP BY Subject;
        </code>
      </div>

      <div style={footer}>
          <button style={backBtn} onClick={() => window.history.back()}>← Back to Dashboard</button>
      </div>
    </div>
  );
}

const getProgressColor = (score) => {
  if (score >= 90) return "#4ade80";
  if (score >= 75) return "#38bdf8";
  if (score >= 50) return "#fbbf24";
  return "#fb7185";
};

// --- Styles ---

const container = {
  padding: "40px",
  maxWidth: "1000px",
  margin: "0 auto",
  minHeight: "100vh",
};

const header = {
  marginBottom: "40px",
  textAlign: "center",
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
};

const subtitle = {
  color: "var(--text-secondary)",
  fontSize: "14px",
  marginTop: "5px",
};

const analyticsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const analyticsCard = {
  padding: "25px",
};

const subjectTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "15px",
};

const progressBg = {
  width: "100%",
  height: "10px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "5px",
  overflow: "hidden",
  marginBottom: "10px",
};

const progressFill = {
  height: "100%",
  borderRadius: "5px",
};

const scoreText = {
  fontSize: "14px",
  color: "var(--text-secondary)",
};

const querySection = {
  padding: "25px",
  background: "rgba(0,0,0,0.2)",
};

const queryTitle = {
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#4ade80",
};

const code = {
  fontSize: "13px",
  color: "var(--text-secondary)",
  fontFamily: "monospace",
};

const msg = {
  textAlign: "center",
  padding: "40px",
  color: "var(--text-secondary)",
  gridColumn: "1 / -1",
};

const footer = {
    marginTop: "30px",
    textAlign: "center",
};

const backBtn = {
    background: "transparent",
    border: "1px solid var(--glass-border)",
    color: "var(--text-secondary)",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
};

export default Analytics;