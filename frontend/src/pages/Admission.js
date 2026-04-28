import React, { useState } from "react";

function Admission() {
  const [form, setForm] = useState({
    name: "",
    class: "",
    section: "",
    age: "",
    previousPercentage: ""
  });

  const handleChange = (e) => {
    let value = e.target.value;

    // 🔥 FIX: convert age to number
    if (e.target.name === "age") {
      value = Number(value);
    }

    setForm({ ...form, [e.target.name]: value });
  };

  const submit = async () => {
  const payload = {
    name: form.name,
    class: form.class,
    section: form.section,
    age: Number(form.age), // 🔥 FINAL SAFETY
    previousPercentage: form.previousPercentage || ""
  };

  await fetch("http://localhost:5104/api/admission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  alert("Admission Submitted");

  setForm({
    name: "",
    class: "",
    section: "",
    age: "",
    previousPercentage: ""
  });
};
  return (
    <div style={page}>
      <h1 style={title}>📄 Admission Form</h1>

      <div style={formBox}>
        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="class"
          value={form.class}
          onChange={handleChange}
        >
          <option value="">Select Class</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        {/* 🔥 FIX: proper condition */}
        {Number(form.class) > 3 && (
          <input
            name="previousPercentage"
            placeholder="Previous Class %"
            value={form.previousPercentage}
            onChange={handleChange}
          />
        )}

        <button style={btn} onClick={submit}>
          Submit Admission
        </button>
      </div>
    </div>
  );
}

/* STYLES SAME */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fef9e7, #f9e79f)",
  padding: "40px"
};

const title = {
  textAlign: "center",
  marginBottom: "30px"
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxWidth: "400px",
  margin: "0 auto"
};

const btn = {
  padding: "10px",
  background: "#f39c12",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Admission;