import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card" 
        style={heroCard}
      >
        <h1 className="gradient-text" style={title}>NOVA CREST</h1>
        <p style={subtitle}>Digital Renaissance in Education Management</p>
        
        <div style={featureList}>
          <div style={feature}>⚡ Real-time MySQL Sync</div>
          <div style={feature}>📊 Advanced DBMS Analytics</div>
          <div style={feature}>🛡️ Secure Data Integrity</div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={loginBtn}
          onClick={() => navigate("/dashboard")}
        >
          Enter Dashboard
        </motion.button>
      </motion.div>

      <div style={footer}>
        DBMS PROJECT 2026 • CORE DATA LAYER
      </div>
    </div>
  );
}

// --- Styles ---

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at center, #1e293b 0%, #020617 100%)",
  overflow: "hidden",
};

const heroCard = {
  padding: "60px",
  textAlign: "center",
  maxWidth: "600px",
  width: "90%",
};

const title = {
  fontSize: "64px",
  fontWeight: "900",
  letterSpacing: "-2px",
  marginBottom: "10px",
};

const subtitle = {
  fontSize: "18px",
  color: "#94a3b8",
  marginBottom: "40px",
};

const featureList = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "40px",
  alignItems: "center",
};

const feature = {
  fontSize: "14px",
  color: "#e2e8f0",
  background: "rgba(255,255,255,0.05)",
  padding: "8px 20px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.1)",
};

const loginBtn = {
  padding: "15px 40px",
  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
  color: "white",
  border: "none",
  borderRadius: "30px",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(56, 189, 248, 0.3)",
};

const footer = {
  position: "absolute",
  bottom: "40px",
  fontSize: "12px",
  color: "#64748b",
  letterSpacing: "4px",
};

export default LandingPage;