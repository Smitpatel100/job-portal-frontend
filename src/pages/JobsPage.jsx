import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextObject";
import api from "../api/axios";
import toast from "react-hot-toast";

function JobsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [myApplications, setMyApplications] = useState({});
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [loading, setLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/jobs?page=${page}&size=5&sortBy=${sortBy}&keyword=${keyword}`
      );

      const data = response.data?.data;

      setJobs(data?.content || []);
      setTotalPages(data?.totalPages || 0);

      if (user?.role === "CANDIDATE") {
        const appResponse = await api.get("/applications/my");
        const applications = appResponse.data?.data || [];

        const map = {};
        applications.forEach((app) => {
          map[app.jobId] = app.status;
        });

        setMyApplications(map);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, keyword, sortBy, user]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleApply = async (jobId) => {
    try {
      await api.post(`/applications/${jobId}`);
      toast.success("Applied successfully!");
      loadJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      toast.success("Job deleted");
      loadJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Available Jobs</h2>

      {/* Search + Sort */}
      <form
        onSubmit={handleSearch}
        style={{
          marginBottom: "25px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Search jobs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            minWidth: "220px"
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd"
          }}
        >
          <option value="id">Newest</option>
          <option value="salary">Salary</option>
          <option value="title">Title</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <div className="card">No jobs found.</div>
      ) : (
        jobs.map((job) => {
          const appliedStatus = myApplications[job.id];

          return (
            <div key={job.id} className="card" style={{ marginBottom: "20px" }}>
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <p style={{ color: "#666", marginBottom: "10px" }}>
                Posted by: {job.employerName}
              </p>

              {/* Candidate View */}
              {user?.role === "CANDIDATE" && (
                <div>
                  {appliedStatus ? (
                    <span className={getBadgeClass(appliedStatus)}>
                      {appliedStatus}
                    </span>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              )}

              {/* Employer/Admin View */}
              {(user?.role === "EMPLOYER" || user?.role === "ADMIN") && (
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
                  <button
                    className="btn"
                    style={{ background: "#111827", color: "white" }}
                    onClick={() =>
                      navigate(`/applications/${job.id}`)
                    }
                  >
                    View Applications
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/edit-job/${job.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className="btn"
              style={{
                background:
                  index === page ? "var(--primary)" : "var(--gray-border)",
                color: index === page ? "white" : "black"
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsPage;