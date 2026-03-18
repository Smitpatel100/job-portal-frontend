import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextObject";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: "30px" }}>Job Portal</h2>

      <Link to="/jobs">Jobs</Link>

      {user?.role === "CANDIDATE" && (
        <Link to="/my-applications">My Applications</Link>
      )}

      {(user?.role === "EMPLOYER" || user?.role === "ADMIN") && (
        <>
          <Link to="/create-job">Create Job</Link>
        </>
      )}

      {user?.role === "ADMIN" && (
        <Link to="/admin">Admin Panel</Link>
      )}
    </div>
  );
};

export default Sidebar;