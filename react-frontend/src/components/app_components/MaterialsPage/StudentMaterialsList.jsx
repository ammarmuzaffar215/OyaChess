import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import client from "../../../services/restClient";

const extractYouTubeId = (url) => {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch (e) {
    console.warn("Invalid YouTube URL:", url);
    return null;
  }
  return null;
};

const getRandomBrightColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 85%)`;
};

const StudentMaterialsList = ({ materials, user }) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const enrollmentRes = await client.service("enrollments").find({
          query: {
            $limit: 10000,
            $populate: [
              { path: "packageId", service: "packages", select: ["title"] },
              { path: "userId", service: "users", select: ["name"] },
            ],
          },
        });

        const matchedEnrollments = enrollmentRes.data.filter(
          (e) => e.userId === user._id || e.userId?._id === user._id
        );

        const validPackageIds = matchedEnrollments.map((e) =>
          typeof e.packageId === "object" ? e.packageId._id : e.packageId
        );

        console.log("👤 Logged-in user ID:", user._id);
        console.log("🎓 Matching enrollments:", matchedEnrollments);
        console.log("📦 Valid package IDs:", validPackageIds);

        const matchedMaterials = materials.filter((material) => {
          const materialPackageId =
            typeof material.packageId === "object"
              ? material.packageId._id
              : material.packageId;
          return validPackageIds.includes(materialPackageId);
        });

        console.log("✅ Filtered materials:", matchedMaterials);
        setFiltered(matchedMaterials);
      } catch (err) {
        console.error("❌ Failed to fetch enrollments:", err);
        setFiltered([]);
      }
    };

    if (user?._id) fetchEnrollments();
  }, [materials, user]);

  return (
    <div className="grid p-3 gap-3">
      {filtered.length === 0 ? (
        <p>No materials available for your assigned packages.</p>
      ) : (
        filtered.map((item) => (
          <div className="col-12 md:col-6 lg:col-4" key={item._id}>
            <Card
              title={item.title}
              subTitle={item.packageId?.title || "No Package"}
              style={{
                backgroundColor: getRandomBrightColor(),
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
              <p style={{ fontStyle: "italic", color: "#555" }}>
                {item.description || "No description available."}
              </p>

              {item.videoUrl && extractYouTubeId(item.videoUrl) ? (
                <div style={{ marginBottom: "1rem" }}>
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(
                      item.videoUrl
                    )}`}
                    title="YouTube Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : item.videoUrl ? (
                <a
                  href={
                    item.videoUrl.startsWith("http")
                      ? item.videoUrl
                      : `https://${item.videoUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#007ad9",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  🔗 Watch Video
                </a>
              ) : (
                <span style={{ color: "#999" }}></span>
              )}

              {item.files ? (
                <div
                  style={{
                    border: "1px solid #d3d3d3",
                    borderRadius: "8px",
                    padding: "12px",
                    backgroundColor: "#f7f9fb",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>📎</span>
                  <a
                    href={item.files}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "#2A4454",
                      fontWeight: "600",
                      wordBreak: "break-all",
                    }}
                  >
                    Download Material
                  </a>
                </div>
              ) : (
                <p style={{ color: "#999", marginTop: "1rem" }}>
                  No file uploaded.
                </p>
              )}
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentMaterialsList;
