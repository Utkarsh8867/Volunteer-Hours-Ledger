










import React, { useState } from "react";

function Ledger({ account, addStudentHandler, addEntryHandler }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [hours, setHours] = useState("");

  // --- Styles ---
  const containerStyle = {
    background: "rgba(30,30,30,0.9)",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #444",
    maxWidth: "450px",
    margin: "20px auto",
    color: "#f0f0f0",
    fontFamily: "Segoe UI, sans-serif",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
  };
  const titleStyle = { fontSize: "22px", fontWeight: "bold", marginBottom: "15px", textAlign: "center" };
  const inputStyle = { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px", border: "1px solid #555", backgroundColor: "#222", color: "#eee", fontSize: "14px", outline: "none" };
  const buttonStyle = { width: "100%", padding: "12px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer", marginTop: "5px", fontSize: "15px", transition: "all 0.3s ease" };
  const purpleButton = { ...buttonStyle, backgroundColor: "#7e57c2", color: "white" };
  const greenButton = { ...buttonStyle, backgroundColor: "#2ecc71", color: "white" };

  // --- Handlers with input clearing ---
  const handleSaveStudent = async () => {
    if (!account) return alert("Connect wallet first");
    await addStudentHandler(name, age, college);
    setName(""); setAge(""); setCollege("");
  };

  const handleAddEntry = async () => {
    if (!account) return alert("Connect wallet first");
    await addEntryHandler(organisation, hours);
    setOrganisation(""); setHours("");
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Ledger Form</h2>

      {/* Student profile */}
      <input style={inputStyle} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input style={inputStyle} placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <input style={inputStyle} placeholder="College" value={college} onChange={e => setCollege(e.target.value)} />
      <button
        style={purpleButton}
        onMouseOver={e => (e.target.style.backgroundColor = "#6a4fbf")}
        onMouseOut={e => (e.target.style.backgroundColor = "#7e57c2")}
        onClick={handleSaveStudent}
      >
        Save Student Profile
      </button>

      {/* Add entry */}
      <div style={{ marginTop: "25px" }}>
        <input style={inputStyle} placeholder="Organisation" value={organisation} onChange={e => setOrganisation(e.target.value)} />
        <input style={inputStyle} placeholder="Hours" type="number" value={hours} onChange={e => setHours(e.target.value)} />
        <button
          style={greenButton}
          onMouseOver={e => (e.target.style.backgroundColor = "#27ae60")}
          onMouseOut={e => (e.target.style.backgroundColor = "#2ecc71")}
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
      </div>
    </div>
  );
}

export default Ledger;
