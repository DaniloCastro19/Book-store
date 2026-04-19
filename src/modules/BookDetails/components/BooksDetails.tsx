import styles from "./BookDetails.module.scss";
import useBookDetails from "../hooks/UseBookDetails";
import { cleanBookDescription } from "../utils/CleanBookDescription";
import { useAuth } from "../../Auth/context/UseAuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import BorrowButton from "../../Loan/components/BorrowButton";
import ReturnBookButton from "../../Loan/components/ReturnBookButton";
import { useBookAvailability } from "../../Bookshelf/hooks/UseBookAvailability";

export default function BooksDetails() {
  const { id, book } = useBookDetails();
  const { state, userId, loanId } = useBookAvailability(id ?? "");
  const { title, authors } = book?.volumeInfo || {};
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  };

  const status = state === "Available" ? state : "Not Available";

  return (
    <div className={styles.book_details_container}>
      <Outlet />
      {book?.accessInfo?.embeddable ? (
        <iframe
          src={`https://books.google.com/books?id=${book.id}&printsec=frontcover&output=embed`}
          loading="lazy"
          className={styles.preview}
        ></iframe>
      ) : (
        <img
          src={book?.volumeInfo.imageLinks?.thumbnail}
          alt={title}
          className={styles.book_image}
          loading="lazy"
        />
      )}

      <section className={styles.book_info}>
        <h1 className={styles.book_title}>{title}</h1>
        <p className={styles.book_authors}>
          Author: {Array.isArray(authors) ? authors.join(", ") : authors}
        </p>
        <p className={styles.book_genre}>
          Category: {book?.mainCategory || "Fiction"}
        </p>
        <h2
          className={
            state === "Available"
              ? styles.available_status
              : styles.not_available_status
          }
        >
          {status}
        </h2>
        <BorrowButton
          bookId={book?.id || ""}
          isAvailable={state === "Available"}
        />
        <ReturnBookButton
          bookId={book?.id || ""}
          loanId={loanId}
          borrowedUserId={userId}
        />
        <button
          onClick={handleAddToWishlist}
          className={styles.add_wishlist_btn}
        >
          Add to Wishlist
        </button>
        <section className={styles.book_description}>
          <h1>Description</h1>
          <p>
            {cleanBookDescription(book?.volumeInfo.description) ||
              "No description available for this book."}
          </p>
        </section>
      </section>
    </div>
  );
}
