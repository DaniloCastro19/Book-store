import { useState } from "react";
import { useAuth } from "../../Auth/context/UseAuthContext";
import { useNavigate } from "react-router-dom";
import { loanService } from "../services/LoanService";
import styles from "./ReturnBookButton.module.scss";

interface ReturnBookButtonProps {
  bookId: string;
  loanId: string | null;
  borrowedUserId: string | null;
}

export default function ReturnBookButton({
  bookId,
  loanId,
  borrowedUserId,
}: ReturnBookButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const canReturn =
    isAuthenticated &&
    borrowedUserId &&
    user?.sub === borrowedUserId &&
    loanId;

  const handleReturn = async () => {
    if (!loanId) return;

    setLoading(true);
    try {
      await loanService.returnLoan(loanId, user?.sub || "");
      setModalType("success");
      setModalMessage("Book has been successfully returned!");
      setShowModal(true);
    } catch (error) {
      console.error("Error returning book: ", error);
      setModalType("error");
      setModalMessage("Failed to return the book. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === "success") {
      navigate(`/book-details/${bookId}`);
    }
  };

  if (!canReturn) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleReturn}
        className={styles.returnButton}
        disabled={loading}
      >
        {loading ? "Returning..." : "Return Book"}
      </button>
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={`${styles.modalContent} ${
              modalType === "success" ? styles.success : styles.error
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modalType === "success" ? "Success!" : "Error"}</h3>
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal} className={styles.modalButton}>
              {modalType === "success" ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
