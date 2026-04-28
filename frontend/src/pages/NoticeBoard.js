import React, { useState } from "react";

function NoticeBoard() {
  const [notices, setNotices] = useState([
    { event: "Annual Day", date: "25 March", url: "" }
  ]);

  const [form, setForm] = useState({
    event: "",
    date: "",
    url: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [login, setLogin] = useState({ id: "", password: "" });

  const handleLogin = () => {
    if (login.id === "admin" && login.password === "1234") {
      setIsLoggedIn(true);
      setIsEditing(true);
    } else {
      alert("Wrong Credentials");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addNotice = () => {
    setNotices([{ ...form }, ...notices]);
    setForm({ event: "", date: "", url: "" });
  };

  return (
    <div style={page}>
      <h1 style={title}>📢 Notice Board</h1>

      {/* EDIT BUTTON */}
      <button style={editBtn} onClick={() => setIsEditing(true)}>
        ✏️ Edit
      </button>

      {/* LOGIN */}
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

      {/* FORM */}
      {isLoggedIn && (
        <div style={formBox}>
          <input
            name="event"
            placeholder="Event"
            value={form.event}
            onChange={handleChange}
          />
          <input
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
          />
          <input
            name="url"
            placeholder="Optional URL"
            value={form.url}
            onChange={handleChange}
          />

          <button style={btn} onClick={addNotice}>
            Add Notice
          </button>
        </div>
      )}

      {/* DISPLAY */}
      <div style={grid}>
        {notices.map((n, i) => (
          <div key={i} style={card}>
            <h3>{n.event}</h3>
            <p>{n.date}</p>
            {n.url && <a href={n.url}>View More</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* STYLES */

const page = {
  padding: "40px",
  background: "#fef9e7",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "20px"
};

const editBtn = {
  display: "block",
  margin: "10px auto"
};

const formBox = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginBottom: "20px"
};

const btn = {
  background: "#e67e22",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px"
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

export default NoticeBoard;