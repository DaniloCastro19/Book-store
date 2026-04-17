import { useAuth } from "../../Auth/context/UseAuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./BorrowButton.module.scss";

interface BorrowButtonProps {
  bookId: string;
  isAvailable: boolean;
}

export default function BorrowButton({
  bookId,
  isAvailable,
}: BorrowButtonProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !isAvailable) {
    return null;
  }

  const handleBorrow = () => {
    navigate(`/book-details/${bookId}/create-loan`);
  };

  return (
    <button onClick={handleBorrow} className={styles.borrowButton}>
      Borrow Book
    </button>
  );
}
