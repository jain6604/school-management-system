import React, { useState } from "react";

function BusService() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    {
      name: "Route 1 - Freeganj",
      stops: ["Freeganj", "Tower Chowk", "Dewas Gate", "School"],
      distance: 5
    },
    {
      name: "Route 2 - Nanakheda",
      stops: ["Nanakheda", "MR10", "Engineering College", "School"],
      distance: 7
    },
    {
      name: "Route 3 - Mahakal Area",
      stops: ["Mahakal", "Hari Phatak", "Teen Batti", "School"],
      distance: 6
    },
    {
      name: "Route 4 - Kothi Road",
      stops: ["Kothi Road", "Chamunda Mata", "Indore Gate", "School"],
      distance: 8
    },
    {
      name: "Route 5 - Sanwer Road",
      stops: ["Sanwer Road", "Industrial Area", "MR5", "School"],
      distance: 10
    }
  ];

  const calculateFee = (distance) => {
    if (distance <= 5) return 8000;
    return 8000 + Math.ceil((distance - 5) / 2) * 1000;
  };

  return (
    <div style={page}>
      <h1 style={title}>🚌 Bus Service</h1>

      {/* ROUTE LIST */}
      <div style={grid}>
        {routes.map((route, index) => (
          <div
            key={index}
            style={card}
            onClick={() => setSelectedRoute(route)}
          >
            <h3>{route.name}</h3>
            <p>Distance: {route.distance} km</p>
          </div>
        ))}
      </div>

      {/* DETAILS */}
      {selectedRoute && (
        <div style={details}>
          <h2>{selectedRoute.name}</h2>

          <h4>📍 Stops:</h4>
          <ul>
            {selectedRoute.stops.map((stop, i) => (
              <li key={i}>{stop}</li>
            ))}
          </ul>

          <p><b>Destination:</b> Young Public School</p>

          <p><b>Distance:</b> {selectedRoute.distance} km</p>

          <p><b>Fee:</b> ₹{calculateFee(selectedRoute.distance)} / year</p>

          {/* MAP (SIMULATED) */}
          <div style={mapBox}>
            🗺️ Map View (Route Visualization)
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const page = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #eaf2f8, #aed6f1)"
};

const title = {
  textAlign: "center",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const details = {
  marginTop: "30px",
  background: "white",
  padding: "25px",
  borderRadius: "12px"
};

const mapBox = {
  marginTop: "20px",
  height: "200px",
  background: "#d6eaf8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px"
};

export default BusService;