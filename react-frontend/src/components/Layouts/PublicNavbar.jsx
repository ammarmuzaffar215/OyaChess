import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "primereact/button";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const label = process.env.REACT_APP_PROJECT_LABEL || "My App";

  return (
    <div
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#fff",
      }}
    >
      {/* Logo and App Name */}
      <Link
        to="/"
        style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        <img
          src="./assets/logo/oyachess.svg"
          height={30}
          alt="Logo"
          style={{ marginRight: "10px" }}
        />
        <h3
          style={{
            margin: 0,
            fontFamily: "MarlinGeo",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {label}
        </h3>
      </Link>

      {/* Navigation Menu */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <button onClick={() => navigate("/")} style={navBtnStyle}>Home</button>
        <button onClick={() => navigate("/learn")} style={navBtnStyle}>Learn</button>
        <button onClick={() => navigate("/shop")} style={navBtnStyle}>Shop</button>
        <button onClick={() => navigate("/coaching")} style={navBtnStyle}>Coaching</button>
        
        {/* Login Button using PrimeReact */}
        <Button
          label="Login"
          className="p-button-rounded p-button-text"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

const navBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  color: "#2A4454",
};

export default PublicNavbar;
