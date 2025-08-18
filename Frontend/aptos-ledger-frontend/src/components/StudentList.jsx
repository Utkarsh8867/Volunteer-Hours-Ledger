







import React from "react";

const StudentCard = ({ name, age, college, organisation, hours }) => {
  const cardStyle = {
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    marginBottom: "20px",
    fontFamily: "'Poppins', sans-serif",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1f2937",
  };

  const textStyle = {
    fontSize: "1rem",
    margin: "6px 0",
    color: "#374151",
  };

  const cardHover = (e, hover) => {
    if (hover) {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.18)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => cardHover(e, true)}
      onMouseLeave={(e) => cardHover(e, false)}
    >
      <h2 style={titleStyle}>{name}</h2>
      <p style={textStyle}>🎓 College: {college}</p>
      <p style={textStyle}>🏢 Organisation: {organisation}</p>
      <p style={textStyle}>📅 Age: {age}</p>
      <p style={{ ...textStyle, fontWeight: "600", color: "#2563eb" }}>
        ⏱ Hours: {hours}
      </p>
    </div>
  );
};

const StudentList = () => {
  const students = [
    {
      name: "Nishant",
      age: 21,
      college: "IIT Delhi",
      organisation: "Red Cross",
      hours: 15,
    },
    {
      name: "Sagar",
      age: 22,
      college: "NIT Trichy",
      organisation: "UNICEF",
      hours: 20,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "30px auto",
        padding: "10px",
      }}
    >
      {students.map((student, index) => (
        <StudentCard key={index} {...student} />
      ))}
    </div>
  );
};

export default StudentList;
