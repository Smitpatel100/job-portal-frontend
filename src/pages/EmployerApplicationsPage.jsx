import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function EmployerApplicationsPage() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      const response = await api.get(`/applications/job/${jobId}`);
      setApplications(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status?status=${status}`);
      toast.success("Status updated successfully!");
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "SELECTED":
        return "badge badge-success";
      case "SHORTLISTED":
        return "badge badge-warning";
      case "REJECTED":
        return "badge badge-danger";
      default:
        return "badge";
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Applicants</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <div className="card">No applications yet.</div>
      ) : (
        applications.map((app) => (
          <div key={app.applicationId} className="card" style={{ marginBottom: "15px" }}>
            <p><strong>Name:</strong> {app.candidateName}</p>
            <p><strong>Email:</strong> {app.candidateEmail}</p>

            <div style={{ marginBottom: "10px" }}>
              <strong>Status: </strong>
              <span className={getBadgeClass(app.status)}>
                {app.status}
              </span>
            </div>

            {app.status === "APPLIED" && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-success"
                  onClick={() => updateStatus(app.applicationId, "SHORTLISTED")}
                >
                  Shortlist
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => updateStatus(app.applicationId, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            )}

            {app.status === "SHORTLISTED" && (
              <button
                className="btn btn-primary"
                onClick={() => updateStatus(app.applicationId, "SELECTED")}
              >
                Select
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EmployerApplicationsPage;