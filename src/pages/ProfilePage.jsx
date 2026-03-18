import { useContext } from "react";
import { AuthContext } from "../context/AuthContextObject";
import MainLayout from "../layouts/MainLayout";

function ProfilePage() {
    const { user } = useContext(AuthContext);

    return (
        <MainLayout>
            <div className="card">
                <h2>My Profile</h2>

                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
            </div>
        </MainLayout>
    );
}

export default ProfilePage;