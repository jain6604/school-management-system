import React, { useEffect, useState } from "react";

function Merit() {
  const [students, setStudents] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5104/api/students");
    const data = await res.json();

    // sort by age (temporary ranking logic)
    const sorted = data.sort((a, b) => b.age - a.age);

    setStudents(sorted);
  };

  // 🔐 Protection
  if (role !== "staff") {
    return <h2 style={{ textAlign: "center" }}>🚫 Access Denied</h2>;
  }

  return (
    <div style={page}>
      <h2 style={{ textAlign: "center" }}>🏆 Merit List</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Class</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */

const page = {
  padding: "30px",
  background: "#fdf2e9",
  minHeight: "100vh"
};

const table = {
  width: "80%",
  margin: "20px auto",
  borderCollapse: "collapse",
  background: "white"
};

export default Merit;