import React, { useState } from "react";

function Syllabus() {
  const [selectedClass, setSelectedClass] = useState("1");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [login, setLogin] = useState({ id: "", password: "" });

  const [data, setData] = useState({
    1: "English, Math, EVS",
    2: "English, Math, EVS",
    3: "English, Math, Science",
    4: "English, Math, Science, Social",
    5: "English, Math, Science, Social",
    6: "Math, Science, Social, English",
    7: "Math, Physics, Chemistry, English",
    8: "Math, Physics, Chemistry, Biology",
    9: "Math, Science, English, SST",
    10: "Math, Science, English, SST",
    11: "Physics, Chemistry, Math (PCM)",
    12: "Physics, Chemistry, Math (PCM)"
  });

  const handleLogin = () => {
    if (login.id === "admin" && login.password === "1234") {
      setIsLoggedIn(true);
      setIsEditing(true);
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>📘 Syllabus</h1>

      {/* CLASS SELECT */}
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        style={dropdown}
      >
        {[...Array(12)].map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>

      {/* EDIT BUTTON */}
      <button style={editBtn} onClick={() => setIsEditing(true)}>
        ✏️ Edit
      </button>

      {/* LOGIN POPUP */}
      {isEditing && !isLoggedIn && (
        <div style={popup}>
          <input
            placeholder="ID"
            onChange={(e) => setLogin({ ...login, id: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* CONTENT */}
      <div style={card}>
        {isLoggedIn ? (
          <textarea
            value={data[selectedClass]}
            onChange={(e) =>
              setData({ ...data, [selectedClass]: e.target.value })
            }
            style={textarea}
          />
        ) : (
          <p>{data[selectedClass]}</p>
        )}
      </div>
    </div>
  );
}

/* STYLES */

const page = {
  padding: "40px",
  background: "#f4ecf7",
  minHeight: "100vh"
};

const title = { textAlign: "center" };

const dropdown = {
  display: "block",
  margin: "20px auto",
  padding: "10px"
};

const editBtn = {
  display: "block",
  margin: "10px auto",
  padding: "8px 15px"
};

const card = {
  background: "white",
  padding: "20px",
  maxWidth: "500px",
  margin: "auto",
  borderRadius: "10px"
};

const textarea = {
  width: "100%",
  height: "100px"
};

const popup = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  borderRadius: "10px"
};

export default Syllabus;