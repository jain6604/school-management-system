import React, { useState } from "react";

function Exams() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [login, setLogin] = useState({ id: "", password: "" });

  const [data, setData] = useState({
    1: [
      { subject: "Math", date: "10 March" },
      { subject: "English", date: "12 March" }
    ],
    2: [
      { subject: "Math", date: "11 March" },
      { subject: "EVS", date: "13 March" }
    ],
    10: [
      { subject: "Math", date: "10 March" },
      { subject: "Science", date: "12 March" },
      { subject: "English", date: "14 March" }
    ],
    12: [
      { subject: "Physics", date: "10 March" },
      { subject: "Chemistry", date: "12 March" },
      { subject: "Math", date: "14 March" }
    ]
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
      <h1 style={title}>📅 Exam Schedule</h1>

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
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {(data[selectedClass] || []).map((e, i) => (
            <tr key={i}>
              <td>
                {isLoggedIn ? (
                  <input defaultValue={e.subject} />
                ) : (
                  e.subject
                )}
              </td>
              <td>
                {isLoggedIn ? (
                  <input defaultValue={e.date} />
                ) : (
                  e.date
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */

const page = {
  padding: "40px",
  background: "#eaf2f8",
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
  margin: "10px auto"
};

const table = {
  width: "60%",
  margin: "20px auto",
  background: "white",
  borderCollapse: "collapse"
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

export default Exams;