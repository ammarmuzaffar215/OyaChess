import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProjectLayout from "../Layouts/ProjectLayout";

const AdminControl = ({ user }) => {
  const [enrollmentsByPackage, setEnrollmentsByPackage] = useState({});
  const [scheduleByPackage, setScheduleByPackage] = useState({});

  useEffect(() => {
    // Synced real package names
    setEnrollmentsByPackage({
      "Intermediate Strategy": 38,
      "Advanced Tactics & Game Review": 27,
      "Classroom Tutoring": 61,
    });

    setScheduleByPackage({
      "Intermediate Strategy": [
        { student: "Hafiz", coach: "Coach Zara", time: "10:00 AM", date: "2025-06-20" },
        { student: "Lina", coach: "Coach Zara", time: "2:00 PM", date: "2025-06-21" },
      ],
      "Advanced Tactics & Game Review": [
        { student: "Yuki", coach: "Coach Max", time: "4:00 PM", date: "2025-06-22" },
        { student: "Dinesh", coach: "Coach Max", time: "6:00 PM", date: "2025-06-23" },
      ],
      "Classroom Tutoring": [
        { student: "Group A", coach: "Coach Ana", time: "9:00 AM", date: "2025-06-22" },
        { student: "Group B", coach: "Coach Ana", time: "11:00 AM", date: "2025-06-29" },
      ],
    });
  }, []);

  return (
    <ProjectLayout>
      <div className="p-4">
        <h2 style={styles.heading}>Admin Dashboard</h2>

        {/* Enrollments by Package */}
        <div style={styles.section}>
          <h3>Enrollments by Package</h3>
          <div style={styles.grid}>
            {Object.entries(enrollmentsByPackage).map(([pkg, count]) => (
              <div key={pkg} style={styles.card}>
                <h4 style={styles.packageTitle}>{pkg}</h4>
                <p style={styles.bigNumber}>{count}</p>
                <p style={styles.subText}>Total Enrolled</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule by Package */}
        <div style={styles.section}>
          <h3>Scheduled Sessions by Package</h3>
          {Object.entries(scheduleByPackage).map(([pkg, sessions]) => (
            <div key={pkg} style={styles.scheduleBlock}>
              <h4 style={styles.packageTitle}>{pkg}</h4>
              {sessions.length === 0 ? (
                <p>No scheduled sessions.</p>
              ) : (
                <div style={styles.scheduleList}>
                  {sessions.map((s, i) => (
                    <div key={i} style={styles.sessionCard}>
                      <div>
                        <strong>{s.student}</strong> with <em>{s.coach}</em>
                      </div>
                      <div>
                        🕒 {s.time} | 📅 {s.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProjectLayout>
  );
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
    marginBottom: "1.5rem",
  },
  scheduleList: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  sessionCard: {
    backgroundColor: "#f4f8fb",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid #cfdfea",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapState)(AdminControl);
