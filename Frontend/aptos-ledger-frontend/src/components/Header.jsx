




import React, { useState } from "react";

const Header = ({ onShowEntriesClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const headerStyle = {
    background: "linear-gradient(90deg, #6366f1, #9333ea, #ec4899)",
    color: "white",
    padding: "30px 15px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: "800",
    marginBottom: "8px",
    textShadow: "1px 1px 5px rgba(0,0,0,0.25)",
    letterSpacing: "0.5px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    fontWeight: "300",
    fontFamily: "'Roboto', sans-serif",
    color: "#f3f4f6",
    marginBottom: "20px",
  };

  const buttonStyle = {
    background: isHovered ? "#f3e8ff" : "white",
    color: "#7c3aed",
    fontWeight: "bold",
    padding: "8px 22px",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    boxShadow: isHovered
      ? "0 4px 14px rgba(0,0,0,0.2)"
      : "0 3px 8px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease-in-out",
  };

  const circleStyle1 = {
    position: "absolute",
    top: "-25px",
    left: "-25px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    filter: "blur(30px)",
  };

  const circleStyle2 = {
    position: "absolute",
    bottom: "-30px",
    right: "-30px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    filter: "blur(35px)",
  };

  return (
    <header style={headerStyle}>
      <div style={circleStyle1}></div>
      <div style={circleStyle2}></div>

      <h1 style={titleStyle}>Volunteer Hours Ledger</h1>

      <p style={subtitleStyle}>
        Track your volunteer work with{" "}
        <span style={{ fontWeight: "600", color: "#facc15" }}>style ✨</span>
      </p>

      <div>
        <button
          style={buttonStyle}
          onClick={onShowEntriesClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Show / Hide Entries
        </button>
      </div>
    </header>
  );
};

export default Header;
