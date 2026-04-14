import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserSection.module.scss";
import { useAuth } from "../context/UseAuthContext";

export default function UserSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <span className={styles.welcome}>Hello, {user?.name}!</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
