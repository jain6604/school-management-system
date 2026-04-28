import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5104/api/staff")
      .then((res) => res.json())
      .then((data) => {
        setStaff(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staff:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={container}>
      <header style={header}>
        <h1 className="gradient-text" style={title}>Staff Directory</h1>
        <p style={subtitle}>Nova Crest Faculty & Administration</p>
      </header>

      <div style={staffGrid}>
        {loading ? (
          <p style={msg}>Fetching from DBMS...</p>
        ) : (
          staff.map((s) => (
            <motion.div
              key={s.StaffID}
              whileHover={{ y: -10 }}
              className="glass-card"
              style={staffCard}
            >
              <div style={avatar}>{s.FullName.charAt(0)}</div>
              <h3 style={staffName}>{s.FullName}</h3>
              <p style={staffDept}>{s.Department} • {s.Designation}</p>
              <div style={contactInfo}>
                <p style={contactText}>📧 {s.Email}</p>
                <p style={contactText}>📞 {s.Phone || '+91 98765 43210'}</p>
              </div>
            </motion.div>
          ))
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
  maxWidth: "1100px",
  margin: "0 auto",
  minHeight: "100vh",
};

const header = {
  marginBottom: "50px",
  textAlign: "center",
};

const title = {
  fontSize: "36px",
  fontWeight: "800",
};

const subtitle = {
  color: "var(--text-secondary)",
  fontSize: "14px",
  marginTop: "5px",
};

const staffGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "30px",
};

const staffCard = {
  padding: "30px",
  textAlign: "center",
};

const avatar = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 auto 20px",
};

const staffName = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "5px",
};

const staffDept = {
  fontSize: "14px",
  color: "var(--accent-primary)",
  marginBottom: "20px",
};

const contactInfo = {
  borderTop: "1px solid var(--glass-border)",
  paddingTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const contactText = {
  fontSize: "13px",
  color: "var(--text-secondary)",
};

const msg = {
  textAlign: "center",
  padding: "40px",
  color: "var(--text-secondary)",
};

const footer = {
    marginTop: "50px",
    textAlign: "center",
};

const backBtn = {
    background: "transparent",
    border: "1px solid var(--glass-border)",
    color: "var(--text-secondary)",
    padding: "10px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
};

export default Staff;