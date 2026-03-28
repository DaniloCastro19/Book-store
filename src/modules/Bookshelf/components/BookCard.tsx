import type { Book } from "../../../core/models/Book";
import styles from "./BookCard.module.scss";

export default function BookCard({ title, authors, state, imageLinks }: Book) {
  const cover = imageLinks?.thumbnail ?? "https://placehold.co/300x420";
  const authorsLabel = Array.isArray(authors)
    ? authors.join(", ")
    : authors || "Unknown author";

  return (
    <article className={styles.bookcard_container}>
      <img src={cover} alt={title} className={styles.cover} loading="lazy" />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.authors}>Authors: {authorsLabel}</p>
        <p className={styles.state}>State: {state}</p>

        <button type="button" className={styles.wishlistButton}>
          Add to Wishlist
        </button>
      </div>
    </article>
  );
}
