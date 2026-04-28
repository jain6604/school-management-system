import React, { useState, useEffect } from "react";

function Result() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", pass: "" });

  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [marks, setMarks] = useState({});
  const [resultPublished, setResultPublished] = useState(false);

  const subjects = ["Maths", "Science", "English", "Computer"];

  const login = () => {
    if (credentials.id === "admin" && credentials.pass === "1234") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    fetchStudents();

    if (localStorage.getItem("resultPublished") === "true") {
      setResultPublished(true);
    }
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5104/api/students");
    const data = await res.json();
    setStudents(data);
  };

  // 🔥 MARKS VALIDATION ADDED
  const handleMarksChange = (studentId, subject, value) => {
    if (value < 0 || value > 100) {
      alert("Marks must be between 0 and 100");
      return;
    }

    setMarks({
      ...marks,
      [studentId]: {
        ...marks[studentId],
        [subject]: value
      }
    });
  };

  const calculatePercentage = (studentId) => {
    const studentMarks = marks[studentId];
    if (!studentMarks) return 0;

    const values = Object.values(studentMarks);
    const total = values.reduce((a, b) => a + Number(b || 0), 0);

    return (total / (subjects.length * 100)) * 100;
  };

  const getStatus = (studentId) => {
    return calculatePercentage(studentId) >= 40 ? "Pass" : "Fail";
  };

  const filtered = selectedClass
    ? students.filter((s) => String(s.class) === String(selectedClass))
    : [];

  // 🔐 LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div style={center}>
        <div style={loginBox}>
          <h2>🔐 Staff Login</h2>
          <input
            placeholder="Login ID"
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, pass: e.target.value })
            }
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <h1 style={title}>📊 Result Entry System</h1>

      {/* ACTION BUTTONS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={saveBtn}
          onClick={() => {
            localStorage.setItem("marksData", JSON.stringify(marks));
            alert("Marks Saved");
          }}
        >
          💾 Save Marks
        </button>

        {/* 🔥 UPDATED PUBLISH */}
        <button
          style={publishBtn}
          onClick={() => {
            const confirm = window.confirm("Publish results?");
            if (!confirm) return;

            const pass = prompt("Enter password (1234)");

            if (pass !== "1234") {
              alert("Wrong password");
              return;
            }

            setResultPublished(true);
            localStorage.setItem("resultPublished", "true");

            alert("✅ Result Published");
          }}
        >
          📢 Publish Result
        </button>
      </div>

      {/* CLASS SELECT */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          <option>Select Class</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={(i + 1).toString()}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      {selectedClass && (
        <table style={table}>
          <thead>
            <tr>
              <th>Name</th>
              {subjects.map((sub) => (
                <th key={sub}>{sub}</th>
              ))}
              <th>%</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>

                {subjects.map((sub) => (
                  <td key={sub}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks[s.id]?.[sub] || ""}
                      onChange={(e) =>
                        handleMarksChange(s.id, sub, e.target.value)
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                ))}

                <td>{calculatePercentage(s.id).toFixed(2)}%</td>
                <td>{getStatus(s.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* 🔥 DARK UI */

const page = {
  padding: "40px",
  background: "#0f172a",
  color: "white",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "20px"
};

const center = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a"
};

const loginBox = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "white"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  color: "black"
};

const saveBtn = {
  marginRight: "10px",
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const publishBtn = {
  padding: "10px 20px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Result;