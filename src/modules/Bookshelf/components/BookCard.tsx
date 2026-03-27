import type { Book } from "../../../core/models/Book";
import styles from "./BookCard.module.scss";

export default function BookCard({ title, authors, state, imageLinks }: Book) {
  console.log("Aythors type: ", typeof authors);

  return (
    <article className={styles.bookcard_container}>
      <img
        src={imageLinks ? imageLinks.thumbnail : "https://placehold.co/100x100"}
        alt="Book Cover"
        className={styles.bookcard_image}
      />
      <div className={styles.article_info}>
        <h1 className={styles.bookcard_title}>{title}</h1>
        <h2 className={styles.bookcard_authors}>
          Authors: {typeof authors === "object" ? authors.join(", ") : authors}
        </h2>
        <p className={styles.bookcard_state}>State: {state}</p>
        <button className={styles.wishlistButton}>Add to Wishlist</button>
      </div>
    </article>
  );
}
