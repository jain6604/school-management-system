import React, { useState } from "react";

function Timetable() {
  const [selectedClass, setSelectedClass] = useState("1");

  const timetableData = {
    1: [
      ["English", "Math", "EVS", "Break", "Drawing"],
      ["Math", "English", "EVS", "Break", "Games"],
      ["EVS", "Math", "English", "Break", "Drawing"],
      ["English", "Math", "Games", "Break", "EVS"],
      ["Math", "English", "Drawing", "Break", "Games"]
    ],
    5: [
      ["Math", "Science", "English", "Break", "Social"],
      ["English", "Math", "Science", "Break", "Games"],
      ["Science", "Math", "English", "Break", "Social"],
      ["Math", "English", "Games", "Break", "Science"],
      ["English", "Science", "Social", "Break", "Games"]
    ],
    10: [
      ["Math", "Science", "English", "Break", "SST"],
      ["Science", "Math", "English", "Break", "SST"],
      ["English", "Science", "Math", "Break", "Games"],
      ["Math", "English", "Science", "Break", "SST"],
      ["Science", "Math", "English", "Break", "Games"]
    ],
    11: [
      ["Physics", "Chemistry", "Math", "Break", "Lab"],
      ["Math", "Physics", "Chemistry", "Break", "Lab"],
      ["Chemistry", "Math", "Physics", "Break", "Lab"],
      ["Physics", "Math", "Lab", "Break", "Chemistry"],
      ["Math", "Physics", "Chemistry", "Break", "Lab"]
    ],
    12: [
      ["Physics", "Chemistry", "Math", "Break", "Revision"],
      ["Math", "Physics", "Chemistry", "Break", "Revision"],
      ["Chemistry", "Math", "Physics", "Break", "Revision"],
      ["Physics", "Math", "Revision", "Break", "Chemistry"],
      ["Math", "Physics", "Chemistry", "Break", "Revision"]
    ]
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div style={page}>
      <h1 style={title}>⏰ Class Timetable</h1>

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

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Period 1</th>
            <th>Period 2</th>
            <th>Period 3</th>
            <th>Break</th>
            <th>Period 4</th>
          </tr>
        </thead>

        <tbody>
          {(timetableData[selectedClass] || []).map((row, i) => (
            <tr key={i}>
              <td>{days[i]}</td>
              {row.map((sub, j) => (
                <td key={j}>{sub}</td>
              ))}
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
  background: "#e8f8f5",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "20px"
};

const dropdown = {
  display: "block",
  margin: "20px auto",
  padding: "10px"
};

const table = {
  width: "80%",
  margin: "auto",
  background: "white",
  borderCollapse: "collapse"
};

export default Timetable;