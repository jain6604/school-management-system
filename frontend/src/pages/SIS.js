import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SIS() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5104/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={container}>
      <header style={header}>
        <h1 className="gradient-text" style={title}>Student Info System</h1>
        <p style={subtitle}>Live MySQL Records: {students.length} Students</p>
      </header>

      <div className="glass-card" style={tableContainer}>
        {loading ? (
          <p style={msg}>Fetching from DBMS...</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thRow}>
                <th style={th}>ID</th>
                <th style={th}>Full Name</th>
                <th style={th}>Email</th>
                <th style={th}>Status</th>
                <th style={th}>Enrollment</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? students.map((s) => (
                <motion.tr 
                  key={s.StudentID} 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  style={tr}
                >
                  <td style={td}>#{s.StudentID}</td>
                  <td style={td}>{s.FirstName} {s.LastName}</td>
                  <td style={td}>{s.Email}</td>
                  <td style={td}>
                    <span style={{ ...badge, backgroundColor: s.Status === 'Active' ? '#059669' : '#b91c1c' }}>
                      {s.Status}
                    </span>
                  </td>
                  <td style={td}>{new Date(s.EnrollmentDate).toLocaleDateString()}</td>
                </motion.tr>
              )) : (
                <tr>
                    <td colSpan="5" style={msg}>No student records found in DBMS.</td>
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

export default SIS;