import React, { useEffect, useState } from "react";

function Documents() {
  const [activeTab, setActiveTab] = useState("student");

  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");

  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchStaff();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5104/api/students");
    const data = await res.json();
    setStudents(data);
  };

  const fetchStaff = async () => {
    const res = await fetch("http://localhost:5104/api/staff");
    const data = await res.json();
    setStaff(data);
  };

  // 🔐 2FA
  const verify = () => {
    const pass = prompt("Enter admin password (1234)");
    return pass === "1234";
  };

  const filteredStudents = selectedClass
    ? students.filter((s) => String(s.class) === String(selectedClass))
    : students;

  // 🗑️ DELETE
  const deleteStudent = async (id) => {
    if (!verify()) return alert("Wrong password");

    await fetch(`http://localhost:5104/api/students/${id}`, {
      method: "DELETE"
    });

    fetchStudents();
  };

  const deleteStaff = async (id) => {
    if (!verify()) return alert("Wrong password");

    await fetch(`http://localhost:5104/api/staff/${id}`, {
      method: "DELETE"
    });

    fetchStaff();
  };

  // ✏️ EDIT
  const startEdit = (row) => {
    setEditRow(row.id);
    setEditData(row);
  };

  const saveEditStudent = async () => {
    if (!verify()) return alert("Wrong password");

    await fetch(`http://localhost:5104/api/students/${editRow}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    });

    setEditRow(null);
    fetchStudents();
  };

  const saveEditStaff = async () => {
    if (!verify()) return alert("Wrong password");

    await fetch(`http://localhost:5104/api/staff/${editRow}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    });

    setEditRow(null);
    fetchStaff();
  };

  return (
    <div style={page}>
      <h1 style={title}>📁 Documents</h1>

      {/* TABS */}
      <div style={tabs}>
        <button
          style={activeTab === "student" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("student")}
        >
          Student Details
        </button>

        <button
          style={activeTab === "staff" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("staff")}
        >
          Staff Details
        </button>
      </div>

      {/* STUDENTS */}
      {activeTab === "student" && (
        <>
          <div style={filterBox}>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={(i + 1).toString()}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>

          <table style={table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll No</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  {editRow === s.id ? (
                    <>
                      <td>
                        <input
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      </td>
                      <td>{s.class}</td>
                      <td>{s.section}</td>
                      <td>
                        <input
                          value={editData.rollNo}
                          onChange={(e) =>
                            setEditData({ ...editData, rollNo: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <button onClick={saveEditStudent}>💾</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{s.name}</td>
                      <td>{s.class}</td>
                      <td>{s.section}</td>
                      <td>{s.rollNo}</td>
                      <td>
                        <button onClick={() => startEdit(s)}>✏️</button>
                        <button onClick={() => deleteStudent(s.id)}>🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* STAFF */}
      {activeTab === "staff" && (
        <table style={table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Qualification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                {editRow === s.id ? (
                  <>
                    <td>
                      <input
                        value={editData.firstName}
                        onChange={(e) =>
                          setEditData({ ...editData, firstName: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.subject}
                        onChange={(e) =>
                          setEditData({ ...editData, subject: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.qualification}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            qualification: e.target.value
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={saveEditStaff}>💾</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>{s.subject}</td>
                    <td>{s.qualification}</td>
                    <td>
                      <button onClick={() => startEdit(s)}>✏️</button>
                      <button onClick={() => deleteStaff(s.id)}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* STYLES SAME */

const page = {
  minHeight: "100vh",
  padding: "40px",
  background: "#0f172a",
  color: "white"
};

const title = {
  textAlign: "center",
  marginBottom: "30px"
};

const tabs = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

const tabStyle = {
  padding: "10px 20px",
  margin: "0 10px",
  cursor: "pointer",
  background: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const activeTabStyle = {
  ...tabStyle,
  background: "#22c55e"
};

const filterBox = {
  textAlign: "center",
  marginBottom: "20px"
};

const table = {
  width: "90%",
  margin: "auto",
  background: "white",
  color: "black",
  borderCollapse: "collapse"
};

export default Documents;