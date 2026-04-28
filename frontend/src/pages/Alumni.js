import React, { useEffect, useState } from "react";

function Alumni() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5104/api/students");
    const data = await res.json();
    setStudents(data);
  };

  return (
    <div style={page}>
      <h1 style={title}>🎓 Alumni Portal</h1>

      <table style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.section}</td>
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
  background: "#0f172a",
  color: "white",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "20px"
};

const table = {
  width: "100%",
  background: "white",
  color: "black"
};

export default Alumni;