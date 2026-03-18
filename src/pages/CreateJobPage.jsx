import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function CreateJobPage() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", job);
      toast.success("Job created successfully");
      navigate("/jobs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px"
      }}
    >

      <div
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center"
          }}
        >
          Create Job
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "80px" }}
          />

          <input
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              cursor: "pointer"
            }}
          >
            Create Job
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

export default CreateJobPage;