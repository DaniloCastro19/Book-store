import type { LoanResponse } from "../../../core/models/Loan";
import styles from "./LoanCard.module.scss";

export const LoanCard = ({ loan }: { loan: LoanResponse }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className={styles.loan_card}>
      <img
        src={loan.book.coverImage || "https://placehold.co/80x120"}
        alt={loan.book.title}
        className={styles.book_img}
      />
      <div className={styles.loan_info}>
        <h3>{loan.book.title}</h3>
        <p>
          <strong>Author:</strong> {loan.book.authors.join(", ")}
        </p>
        <p>
          <strong>Loan Date:</strong> {formatDate(loan.loanDate)}
        </p>
        <p>
          <strong>Due Date:</strong> {formatDate(loan.dueDate)}
        </p>
        {loan.returnDate && (
          <p>
            <strong>Return Date:</strong> {formatDate(loan.returnDate)}
          </p>
        )}
      </div>
      <div className={`${styles.status_badge} ${styles[loan.status]}`}>
        {loan.status}
      </div>
    </div>
  );
};
