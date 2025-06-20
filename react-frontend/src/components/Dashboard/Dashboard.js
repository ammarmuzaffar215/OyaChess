import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProjectLayout from "../Layouts/ProjectLayout";
import client from "../../services/restClient";

const Dashboard = ({ user }) => {
  const [packages, setPackages] = useState([]);
  const [enrollmentsByPackage, setEnrollmentsByPackage] = useState({});
  const [scheduleByDate, setScheduleByDate] = useState({});

  useEffect(() => {
    client
      .service("packages")
      .find({ query: { $limit: 1000 } })
      .then((pkgRes) => {
        const allPackages = pkgRes.data;
        setPackages(allPackages);

        client
          .service("enrollments")
          .find({
            query: {
              $limit: 1000,
              $populate: [
                { path: "packageId", select: ["title", "_id"] },
                { path: "userId", select: ["name"] },
              ],
            },
          })
          .then((res) => {
            const data = res.data;
            const enrollmentsCount = {};
            const dateMap = {};

            allPackages.forEach((pkg) => {
              enrollmentsCount[pkg._id] = {
                title: pkg.title,
                count: 0,
              };
            });

            data.forEach((enrollment) => {
              const pkg = enrollment.packageId;
              const student = enrollment.userId?.name || "Unknown Student";

              if (pkg && enrollmentsCount[pkg._id]) {
                enrollmentsCount[pkg._id].count++;
              }

              (enrollment.schedule || []).forEach((datetime) => {
                const dateObj = new Date(datetime);
                const dateKey = dateObj.toLocaleDateString();

                if (!dateMap[dateKey]) dateMap[dateKey] = [];

                dateMap[dateKey].push({
                  student,
                  package: pkg?.title || "Unknown Package",
                });
              });
            });

            setEnrollmentsByPackage(enrollmentsCount);
            setScheduleByDate(dateMap);
          })
          .catch((err) => console.error("Error loading enrollments:", err));
      })
      .catch((err) => console.error("Error loading packages:", err));
  }, []);

  return (
    <ProjectLayout>
      <div className="p-4">
        <h2 style={styles.heading}>
          {user?.role === "Student" ? "Dashboard" : "Admin Dashboard"}
        </h2>

        {/* Enrollments by Package (hide for students) */}
        {user?.role !== "Student" && (
          <div style={styles.section}>
            <h3>Enrollments by Package</h3>
            <div style={styles.grid}>
              {packages.map((pkg) => {
                const entry = enrollmentsByPackage[pkg._id];
                const count = entry ? entry.count : 0;
                return (
                  <div key={pkg._id} style={styles.card}>
                    <h4 style={styles.packageTitle}>{pkg.title}</h4>
                    <p style={styles.bigNumber}>{count}</p>
                    <p style={styles.subText}>Total Enrolled</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Schedule by Date */}
        <div style={styles.section}>
          <h3>Scheduled Sessions by Date</h3>
          {Object.entries(scheduleByDate)
            .filter(([date, sessions]) => {
              const isTodayOrLater =
                new Date(date).setHours(0, 0, 0, 0) >=
                new Date().setHours(0, 0, 0, 0);

              if (user?.role === "Student") {
                const hasSessionForStudent = sessions.some(
                  (s) => s.student === user.name
                );
                return isTodayOrLater && hasSessionForStudent;
              }

              return isTodayOrLater;
            })
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, sessions]) => (
              <div key={date} style={styles.scheduleBlock}>
                <strong>
                  📅 {date}
                  {getCountdownLabel(date)}
                </strong>
                <div style={styles.scheduleList}>
                  {sessions.map((s, i) => {
                    const startTime = new Date();
                    startTime.setHours(9 + i * 2, 0, 0, 0);
                    const formattedTime = startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    if (user?.role === "Student" && s.student !== user.name)
                      return null;

                    return (
                      <div key={i} style={styles.sessionCard}>
                        <div>
                          <strong>{s.student}</strong> ({s.package}) at 🕒{" "}
                          {formattedTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </ProjectLayout>
  );
};

// Countdown label logic
const getCountdownLabel = (dateStr) => {
  const today = new Date();
  const target = new Date(dateStr);
  const diffTime = target.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return " 🟥 today";
  if (diffDays === 1) return " ⏳ tomorrow";
  if (diffDays <= 3) return ` ⏳ in ${diffDays} days`;
  return "";
};

const styles = {
  heading: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#2A4454",
    marginBottom: "1.5rem",
  },
  section: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  card: {
    flex: "1 1 250px",
    minWidth: "200px",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  packageTitle: {
    fontSize: "1.2rem",
    color: "#2A4454",
    marginBottom: "0.5rem",
  },
  bigNumber: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "#1C3D57",
  },
  subText: {
    fontSize: "0.9rem",
    color: "#777",
    marginTop: "0.3rem",
  },
  scheduleBlock: {
    marginBottom: "2rem",
  },
  scheduleList: {
    marginTop: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  sessionCard: {
    backgroundColor: "#f4f8fb",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid #cfdfea",
    display: "flex",
    justifyContent: "flex-start",
  },
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapState)(Dashboard);
