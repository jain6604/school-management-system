import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // simple hardcoded auth (for now)
    if (username === "admin" && password === "1234") {
      localStorage.setItem("role", "staff");
      alert("Login successful");
      navigate("/merit");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={page}>
      <div style={box}>
        <h2>🔐 Staff Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f9e79f"
};

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#f39c12",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default StaffLogin;