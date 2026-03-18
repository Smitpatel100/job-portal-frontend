import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load users");
      }
      finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>All Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <div className="card">No users found.</div>
      ) : (
        users.map((user) => (
          <div key={user.id} className="card" style={{ marginBottom: "15px" }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;