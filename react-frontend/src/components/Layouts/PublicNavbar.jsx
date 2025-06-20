import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "primereact/button";

// Simulating a user auth context or state
// Replace this logic with real auth data from context, Redux, or props
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Assume { username: "JohnDoe" }
  return user;
};

const PublicNavbar = () => {
  const navigate = useNavigate();
  const label = process.env.REACT_APP_PROJECT_LABEL || "My App";

  const user = getCurrentUser(); // Simulate fetching logged-in user

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

        {/* User Login/Username */}
        {user ? (
          <span style={{ fontWeight: "bold", color: "#2A4454" }}>
            {user.username}
          </span>
        ) : (
          <Button
            label="Login"
            className="p-button-rounded p-button-text"
            onClick={() => navigate("/login")}
          />
        )}
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
