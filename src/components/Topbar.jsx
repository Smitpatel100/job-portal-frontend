import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContextObject";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      style={{
        height: "60px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 25px",
        position: "relative"
      }}
    >
      {/* Avatar */}
      <div ref={menuRef} style={{ position: "relative" }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#6B8E23",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          {firstLetter}
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "55px",
              width: "260px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              padding: "18px",
              zIndex: 100
            }}
          >
            {/* Avatar big */}
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "#6B8E23",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                  margin: "0 auto 8px"
                }}
              >
                {firstLetter}
              </div>

              <div style={{ fontWeight: "600" }}>{user?.name}</div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "2px"
                }}
              >
                {user?.email}
              </div>
            </div>

            <hr style={{ margin: "12px 0", borderColor: "#eee" }} />

            {/* Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#f3f4f6",
                cursor: "pointer",
                fontWeight: "500",
                marginBottom: "10px"
              }}
            >
              Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#ef4444",
                color: "white",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;