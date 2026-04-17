import { useAuth } from "../../Auth/context/UseAuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./BorrowButton.module.scss";

interface BorrowButtonProps {
  bookId: string;
}

export default function BorrowButton({
  bookId,
}: BorrowButtonProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBorrow = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/book-details/${bookId}/create-loan`);
  };

  return (
    <button onClick={handleBorrow} className={styles.borrowButton}>
      Borrow Book
    </button>
  );
}
