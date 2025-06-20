import React, { useEffect, useState } from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaWhatsapp } from "react-icons/fa"; 
import client from "../../../services/restClient";

const CoachingPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    client
      .service("packages")
      .find({ query: { $limit: 100 } })
      .then((res) => {
        setPackages(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Error loading packages:", err);
      });
  }, []);

  const whatsappLink = (packageName) =>
    `https://api.whatsapp.com/send?phone=+1234567890&text=Hi! I'm interested in the ${packageName} coaching sessions. Can you tell me more?`;

  return (
    <>
      <PublicNavbar />

      {/* Header Section */}
      <div className="bg-white" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center gap-4 py-4">
          <p className="m-0 font-marlin font-bold text-6xl text-black">Coaching</p>
        </div>
        <div
          style={{
            borderTop: "2px solid #000000",
            width: "15%",
            margin: "2rem auto",
          }}
        ></div>
      </div>

      {/* Section: New to Chess */}
      <div className="bg-emerald-700" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center">
          <p className="m-0 font-marlin font-bold text-5xl text-white">
            Have a coaching session to help you improve!
          </p>
        </div>
      </div>

      {/* Coaching Packages */}
      <div className="bg-white px-6 py-8">
        {packages.length === 0 ? (
          <p className="text-center text-gray-500">Loading packages...</p>
        ) : (
          packages.map((pkg, idx) => (
            <div
              key={idx}
              className="flex justify-center mb-6 max-w-screen-xl mx-auto px-6"
            >
              <Card
                title={
                  <div className="text-center font-bold">
                    {pkg.title} - RM {pkg.price}
                  </div>
                }
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              >
                <div className="mb-4 text-center">
                  {(pkg.desc || "").split(",").map((point, i) => (
                    <p key={i} className="mb-1">
                      {point.trim()}
                    </p>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    label={
                      <div className="flex items-center gap-2">
                        Book on WhatsApp
                        <FaWhatsapp className="text-white text-lg" />

                      </div>
                    }
                    className="!border-black bg-green-500 text-white"
                    onClick={() =>
                      window.open(whatsappLink(pkg.title), "_blank")
                    }
                  />
                </div>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white text-center py-8">
        <p className="text-xl font-marlin text-black">
          Want to learn more? Join my classes now to become a good chess player!
        </p>
        <p className="text-sm mt-6 font-marlin text-black">Copyright © 2023 OyaChess</p>
      </div>
    </>
  );
};

export default CoachingPage;
