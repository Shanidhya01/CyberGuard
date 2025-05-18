// src/components/Dashboard.tsx
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { User } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user: SetStateAction<User | null>) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Welcome!</h1>
      <p>Email: {currentUser.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
