import React from "react";
import type { VolumeInfo } from "../../../core/models/Book";
import styles from "./BookCard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/context/UseAuthContext";

function BookCard({ id, title, authors, state, imageLinks }: VolumeInfo) {
  const cover = imageLinks?.thumbnail ?? "https://placehold.co/300x420";
  const authorsLabel = Array.isArray(authors)
    ? authors.join(", ")
    : authors || "Unknown author";
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    console.log("Add to wishlist:", id);
  };

  return (
    <Link to={`/book-details/${id}`} className={styles.link}>
      <article className={styles.bookcard_container}>
        <img src={cover} alt={title} className={styles.cover} loading="lazy" />

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.authors}>Authors: {authorsLabel}</p>
          <p className={styles.state}>State: {state}</p>

          <button
            type="button"
            onClick={handleWishlistClick}
            className={styles.wishlistButton}
          >
            Add to Wishlist
          </button>
        </div>
      </article>
    </Link>
  );
}

export default React.memo(BookCard);
