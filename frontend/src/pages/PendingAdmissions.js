import React, { useEffect, useState } from "react";

function PendingAdmissions() {
  const [data, setData] = useState([]);

  // 🔥 NEW STATES
  const [selectedId, setSelectedId] = useState(null);
  const [section, setSection] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5104/api/admission");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🎯 SECTION OPTIONS
  const getSections = (cls) => {
    if (cls === "11" || cls === "12") {
      return ["Blue", "Green"];
    }
    return ["Red", "Blue", "Green"];
  };

  const accept = async (student) => {
    setSelectedId(student.id);
  };

  const confirmAccept = async (student) => {
    if (!section) {
      alert("Select section first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5104/api/admission/accept/${student.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ section })
        }
      );

      const text = await res.text();

      if (!res.ok) {
        alert("Error accepting admission");
        return;
      }

      alert("✅ Accepted successfully");

      setSelectedId(null);
      setSection("");

      fetchData();
    } catch (err) {
      console.error("Accept error:", err);
      alert("Server error");
    }
  };

  const reject = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5104/api/admission/reject/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!res.ok) {
        alert("Error rejecting admission");
        return;
      }

      alert("❌ Rejected successfully");

      fetchData();
    } catch (err) {
      console.error("Reject error:", err);
      alert("Server error");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>📋 New Admissions</h1>

      {data.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No pending admissions</h3>
      ) : (
        <div style={grid}>
          {data.map((s) => (
            <div key={s.id} style={card}>
              <h2>{s.name}</h2>
              <p>Class: {s.class}</p>

              {s.previousPercentage && (
                <p>Previous %: {s.previousPercentage}</p>
              )}

              <div style={btnBox}>
                {selectedId === s.id ? (
                  <>
                    <select value={section} onChange={(e) => setSection(e.target.value)}>
                      <option>Select Section</option>
                      {getSections(s.class).map((sec, i) => (
                        <option key={i}>{sec}</option>
                      ))}
                    </select>

                    <button
                      style={acceptBtn}
                      onClick={() => confirmAccept(s)}
                    >
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    style={acceptBtn}
                    onClick={() => accept(s)}
                  >
                    ✅ Accept
                  </button>
                )}

                <button
                  style={rejectBtn}
                  onClick={() => reject(s.id)}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* STYLES (unchanged) */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f9ebea, #fadbd8)",
  padding: "40px",
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
};

const btnBox = {
  marginTop: "15px",
  display: "flex",
  justifyContent: "space-between",
};

const acceptBtn = {
  padding: "8px 15px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  padding: "8px 15px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default PendingAdmissions;