

import React, { useState } from "react";
import { AptosClient } from "aptos";
import Header from "./components/Header";
import WalletConnection from "./components/WalletConnection";
import Ledger from "./components/Ledger";
import StudentList from "./components/StudentList";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);
const MODULE_ADDRESS =
  "0x12b1b99992b8c9483a5c17e4dfce57e199e44e431e3a97fd57a1bbfb25d7c7ae";

function App() {
  const [account, setAccount] = useState(null);
  const [student, setStudent] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

   const [showEntries, setShowEntries] = useState(false);

  const handleShowEntriesClick = () => {
    setShowEntries((prev) => !prev);
  };

  // --- Connect wallet ---
  const connectWallet = async () => {
    if (!window.aptos) return alert("Install Petra Wallet");
    try {
      const resp = await window.aptos.connect();
      setAccount(resp.address);
      await fetchStudent(resp.address);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fetch student ---
  const fetchStudent = async (addr) => {
    try {
      const res = await client.view({
        function: `${MODULE_ADDRESS}::ledger::get_student`,
        type_arguments: [],
        arguments: [addr],
      });
      const name = new TextDecoder().decode(new Uint8Array(res[0]));
      const age = Number(res[1]);
      const college = new TextDecoder().decode(new Uint8Array(res[2]));
      setStudent({ addr, name, age, college });
    } catch (err) {
      console.error(err);
      setStudent(null);
    }
  };

  // --- Fetch entries ---
  const fetchEntries = async (addr) => {
    try {
      const lenRes = await client.view({
        function: `${MODULE_ADDRESS}::ledger::get_entries_len`,
        type_arguments: [],
        arguments: [addr],
      });
      const len = Number(lenRes);

      const allEntries = [];
      for (let i = 0; i < len; i++) {
        const entryRes = await client.view({
          function: `${MODULE_ADDRESS}::ledger::get_entry_at`,
          type_arguments: [],
          arguments: [addr, i],
        });
        allEntries.push({
          organisation: new TextDecoder().decode(
            new Uint8Array(entryRes.organisation)
          ),
          hours: Number(entryRes.hours),
        });
      }
      setEntries(allEntries);
    } catch (err) {
      console.error(err);
      setEntries([]);
    }
  };

  // --- Add Student ---
  const addStudentHandler = async (name, age, college) => {
    if (!account) return alert("Connect wallet first");
    try {
      const nameBytes = Array.from(new TextEncoder().encode(name));
      const collegeBytes = Array.from(new TextEncoder().encode(college));

      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::ledger::add_student`,
        type_arguments: [],
        arguments: [nameBytes, Number(age), collegeBytes],
      };

      const tx = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(tx.hash);
      alert("✅ Student profile added!");
      await fetchStudent(account);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Add Entry ---
  const addEntryHandler = async (organisation, hours) => {
    if (!account) return alert("Connect wallet first");
    try {
      const orgBytes = Array.from(new TextEncoder().encode(organisation));

      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::ledger::add_entry`,
        type_arguments: [],
        arguments: [orgBytes, Number(hours)],
      };

      const tx = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(tx.hash);
      alert("✅ Entry added!");
      await fetchEntries(account);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Toggle Profile & Entries ---
  // const handleToggleProfile = async () => {
  //   if (!account) return alert("Connect wallet first");
  //   await fetchEntries(account);
  //   setShowProfile(!showProfile);
  // };

  // --- Inline styles ---
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
    color: "#f8fafc",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    marginBottom: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  };

  // const buttonStyle = {
  //   padding: "12px 28px",
  //   background:
  //     "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(22,163,74,1) 100%)",
  //   color: "white",
  //   border: "none",
  //   borderRadius: "50px",
  //   cursor: "pointer",
  //   fontWeight: "bold",
  //   fontSize: "1rem",
  //   letterSpacing: "0.5px",
  //   transition: "all 0.3s ease-in-out",
  //   margin: "20px auto",
  //   display: "block",
  //   boxShadow: "0 4px 12px rgba(34,197,94,0.5)",
  // };

  // const buttonHover = (e, isHovering) => {
  //   if (isHovering) {
  //     e.target.style.transform = "scale(1.05)";
  //     e.target.style.boxShadow = "0 6px 20px rgba(34,197,94,0.6)";
  //   } else {
  //     e.target.style.transform = "scale(1)";
  //     e.target.style.boxShadow = "0 4px 12px rgba(34,197,94,0.5)";
  //   }
  // };

  // --- Calculate Total Hours ---
  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div style={containerStyle}>
      {/* <Header onShowEntriesClick={handleToggleProfile} /> */}
      <div className="">
        <Header onShowEntriesClick={handleShowEntriesClick} />
      {/* {showEntries && <StudentList />} */}
      </div>
      <WalletConnection account={account} connectWallet={connectWallet} />
      <Ledger
        account={account}
        addStudentHandler={addStudentHandler}
        addEntryHandler={addEntryHandler}
      />

      {/* Student Profile + Entries */}
      {showProfile && student && (
        <div style={cardStyle}>
          <h2
            style={{
              marginBottom: "15px",
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            👤 Student Summary
          </h2>
          <p>
            <b>Name:</b> {student.name}
          </p>
          <p>
            <b>Age:</b> {student.age}
          </p>
          <p>
            <b>College:</b> {student.college}
          </p>
          <p>
            <b>Total Volunteer Hours:</b> {totalHours}
          </p>

          <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
            📝 Entries
          </h3>
          {entries.length === 0 ? (
            <p>No entries yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {entries.map((e, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "rgba(255,255,255,0.05)",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span>🏢 {e.organisation}</span>
                  <span>⏱ {e.hours} hrs</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          marginTop: "30px",
          color: "#9ca3af",
        }}
      >
        🌐 Network: <b>Devnet</b> • 📦 Module: {MODULE_ADDRESS}
      </p>

      {/* <button
        style={buttonStyle}
        onClick={handleToggleProfile}
        onMouseEnter={(e) => buttonHover(e, true)}
        onMouseLeave={(e) => buttonHover(e, false)}
      >
        {showProfile ? "Hide Profile" : "Show Profile"}
      </button> */}
       {showEntries && <StudentList />}
    </div>
  );
}

export default App;
