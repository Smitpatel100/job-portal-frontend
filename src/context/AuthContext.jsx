import { useState } from "react";
import { AuthContext } from "./AuthContextObject";
import { getDecodedToken } from "../utils/jwtUtils";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const decoded = getDecodedToken();

      if (!decoded) return null;

      return {
        email: decoded.sub,
        role: decoded.role,
        name: decoded.sub?.split("@")[0]
      };

    } catch (error) {
      console.error("Auth initialization error:", error);
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token) => {
    localStorage.setItem("token", token);

    const decoded = getDecodedToken();

    const userObj = {
      email: decoded.sub,
      role: decoded.role,
      name: decoded.sub?.split("@")[0]
    };

    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};