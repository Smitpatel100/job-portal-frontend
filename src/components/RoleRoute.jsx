import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextObject";

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;

  if (Array.isArray(allowedRole)) {
    if (!allowedRole.includes(user.role)) {
      return <Navigate to="/jobs" />;
    }
  } else {
    if (user.role !== allowedRole) {
      return <Navigate to="/jobs" />;
    }
  }

  return children;
};

export default RoleRoute;