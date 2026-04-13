import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserSection.module.scss";

export default function UserSection() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <span className={styles.redirecting}>Redirecting to login...</span>
    </div>
  );
}
