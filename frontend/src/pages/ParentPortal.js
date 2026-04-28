import React from "react";

function ParentPortal() {
  const resultPublished = localStorage.getItem("resultPublished");
  const marksData = JSON.parse(localStorage.getItem("marksData") || "{}");

  return (
    <div style={page}>
      <h1 style={title}>👨‍👩‍👧 Parent Portal</h1>

      <div style={grid}>
        <div style={card}>
          <h3>📊 Student Performance</h3>
          <p>View marks and reports</p>
        </div>

        <div style={card}>
          <h3>💰 Fee Status</h3>
          <p>Check fee details</p>
        </div>

        <div style={card}>
          <h3>📞 Communication</h3>
          <p>Contact school</p>
        </div>
      </div>

      {/* RESULT */}
      {resultPublished === "true" && (
        <div style={resultBox}>
          <h2>📊 Student Result</h2>

          {Object.keys(marksData).length === 0 ? (
            <p>No result data available</p>
          ) : (
            Object.entries(marksData).map(([studentId, subjects]) => (
              <div key={studentId} style={resultCard}>
                <h4>Student ID: {studentId}</h4>

                {Object.entries(subjects).map(([sub, mark]) => (
                  <p key={sub}>
                    {sub}: {mark}
                  </p>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* STYLES */

const page = {
  minHeight: "100vh",
  background: "#0f172a",
  padding: "40px",
  color: "white"
};

const title = {
  textAlign: "center",
  marginBottom: "40px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "25px",
  marginBottom: "40px"
};

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center"
};

const resultBox = {
  background: "white",
  color: "black",
  padding: "20px",
  borderRadius: "10px"
};

const resultCard = {
  marginTop: "10px",
  padding: "10px",
  background: "#f4f4f4",
  borderRadius: "8px"
};

export default ParentPortal;