import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoanModal.module.scss";
import useBookDetails from "../../BookDetails/hooks/UseBookDetails";
import { useAuth } from "../../Auth/context/UseAuthContext";
import { loanService } from "../services/LoanService";
import type { CreateLoanRequest } from "../../../core/models/Loan";

export default function LoanModal() {
  const { book, loading } = useBookDetails();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book || !user) return;

    setIsSubmitting(true);
    setError(null);

    const payload: CreateLoanRequest = {
      googleBooksId: book.id,
      userId: user.sub,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description,
      coverImage: book.volumeInfo.imageLinks?.thumbnail,
      category: book.mainCategory,
      dueDate: dueDate || undefined,
    };

    try {
      await loanService.createLoan(payload);
      navigate("/loan-list");
    } catch (err) {
      console.error("Error creating loan:", err);
      setError("Failed to create loan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.modal_container}>
        <p className={styles.loading}>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.modal_container}>
        <p className={styles.error_message}>Book not found.</p>
        <button onClick={() => navigate("/")} className={styles.cancel_btn}>
          Go back
        </button>
      </div>
    );
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
      <form onSubmit={handleSubmit} className={styles.loan_form}>
        <h1>Request Loan</h1>

        <div className={styles.book_info}>
          <h2>{book.volumeInfo.title}</h2>
          <p>
            <strong>Author:</strong>{" "}
            {book.volumeInfo.authors?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Category:</strong> {book.mainCategory || "General"}
          </p>
        </div>

        {error && <p className={styles.error_message}>{error}</p>}

        <div className={styles.form_group}>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // Max 14 days from now
                .toISOString()
                .split("T")[0]
            }
            className={styles.date_input}
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancel_btn}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submit_btn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Loan"}
          </button>
        </div>
      </form>
    </div>
  );
}
