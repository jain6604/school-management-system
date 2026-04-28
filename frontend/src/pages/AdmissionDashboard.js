import React from "react";
import { useNavigate } from "react-router-dom";

function AdmissionDashboard() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1 style={title}>📂 Admission Management</h1>

      <div style={grid}>
        {/* Admission Form */}
        <div style={card} onClick={() => navigate("/admission")}>
          📄 Admission Form
        </div>

        {/* Pending Admissions */}
        <div style={card} onClick={() => navigate("/pending")}>
          📋 New Admissions
        </div>

        {/* Documents */}
        <div style={card} onClick={() => navigate("/documents")}>
        📁 Documents
        </div>

        {/* Result */}
        <div style={card} onClick={() => navigate("/result")} >
          📊 Result 
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const page = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #fef5e7, #fad7a0)"
};

const title = {
  textAlign: "center",
  marginBottom: "40px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "30px",
  maxWidth: "600px",
  margin: "0 auto"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

export default AdmissionDashboard;