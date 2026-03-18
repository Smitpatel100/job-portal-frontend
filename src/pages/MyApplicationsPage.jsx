import { useEffect, useState } from "react";
import api from "../api/axios";

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/applications/my");
      setApplications(response.data?.data || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.applicationId || app.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
            }}
          >
            <p><strong>Job ID:</strong> {app.jobId}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    app.status === "REJECTED"
                      ? "red"
                      : app.status === "SELECTED"
                      ? "green"
                      : app.status === "SHORTLISTED"
                      ? "orange"
                      : "black",
                  fontWeight: "bold"
                }}
              >
                {app.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplicationsPage;