import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Fee() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5104/api/fees")
      .then((res) => res.json())
      .then((data) => {
        setFees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fees:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={container}>
      <header style={header}>
        <h1 className="gradient-text" style={title}>Fee Management</h1>
        <p style={subtitle}>Financial Records & Payment Status (Live MySQL)</p>
      </header>

      <div className="glass-card" style={tableContainer}>
        {loading ? (
          <p style={msg}>Fetching financial records...</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={thRow}>
                <th style={th}>Student Name</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
                <th style={th}>Last Payment</th>
              </tr>
            </thead>
            <tbody>
              {fees.length > 0 ? fees.map((f, i) => (
                <motion.tr 
                  key={i} 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  style={tr}
                >
                  <td style={td}>{f.FirstName} {f.LastName}</td>
                  <td style={td}>₹{f.Amount}</td>
                  <td style={td}>
                    <span style={{ 
                        ...badge, 
                        backgroundColor: f.Status === 'Paid' ? '#059669' : f.Status === 'Partial' ? '#fbbf24' : '#b91c1c' 
                    }}>
                      {f.Status}
                    </span>
                  </td>
                  <td style={td}>{f.PaymentDate ? new Date(f.PaymentDate).toLocaleDateString() : 'N/A'}</td>
                </motion.tr>
              )) : (
                <tr>
                    <td colSpan="4" style={msg}>No fee records found.</td>
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

export default Fee;