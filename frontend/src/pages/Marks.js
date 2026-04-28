import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5104/api/marks")
      .then((res) => res.json())
      .then((data) => {
        setMarks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching marks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={container}>
      <header style={header}>
        <h1 className="gradient-text" style={title}>Academic Performance</h1>
        <p style={subtitle}>Student Subject Scores (Live MySQL)</p>
      </header>

      <div className="glass-card" style={tableContainer}>
        {loading ? (
          <p style={msg}>Fetching academic records...</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thRow}>
                <th style={th}>Student Name</th>
                <th style={th}>Subject</th>
                <th style={th}>Score</th>
                <th style={th}>Grade</th>
                <th style={th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {marks.length > 0 ? marks.map((m, i) => (
                <motion.tr 
                  key={i} 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  style={tr}
                >
                  <td style={td}>{m.FirstName} {m.LastName}</td>
                  <td style={td}>{m.Subject}</td>
                  <td style={td}>{m.Score}/100</td>
                  <td style={td}>
                    <span style={{ 
                        ...badge, 
                        backgroundColor: getGradeColor(m.Score)
                    }}>
                      {getGrade(m.Score)}
                    </span>
                  </td>
                  <td style={td}>{new Date(m.ExamDate).toLocaleDateString()}</td>
                </motion.tr>
              )) : (
                <tr>
                    <td colSpan="5" style={msg}>No marks records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div style={footer}>
          <button style={backBtn} onClick={() => window.history.back()}>← Back to Dashboard</button>
      </div>
    </div>
  );
}

const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 50) return 'C';
    return 'D';
};

const getGradeColor = (score) => {
    if (score >= 90) return '#059669';
    if (score >= 75) return '#38bdf8';
    if (score >= 50) return '#fbbf24';
    return '#b91c1c';
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

const tableContainer = {
  overflow: "hidden",
  padding: "10px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

const thRow = {
  borderBottom: "1px solid var(--glass-border)",
};

const th = {
  padding: "15px 20px",
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--text-secondary)",
};

const tr = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  transition: "0.2s",
};

const td = {
  padding: "15px 20px",
  fontSize: "14px",
};

const badge = {
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  color: "white",
};

const msg = {
  textAlign: "center",
  padding: "40px",
  color: "var(--text-secondary)",
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

export default Marks;