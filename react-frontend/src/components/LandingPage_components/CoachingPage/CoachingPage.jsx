import React from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PublicNavbar />

      {/* Header Section */}
      <div
        className="font-marlin font-bold text-2xl"
        style={{ padding: "2rem" }}
      >
        Coaching
      </div>
    </>
  );
};

export default HomePage;
