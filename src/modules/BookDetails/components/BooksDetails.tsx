import styles from "./BookDetails.module.scss";
export default function BooksDetails() {
  return (
    <div className={styles.book_details_container}>
      <iframe src="https://example.com" frameborder="0"></iframe>

      <section className={styles.book_info}>
        <h1 className={styles.book_title}>Book Title</h1>
        <p className={styles.book_authors}>Author: John Doe</p>
        <p className={styles.book_genre}>Genre: Fiction</p>
        <h2 className={styles.book_availability}>Disponibility: Available</h2>
      </section>

      <section className={styles.book_description}>
        <h1>Description</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          voluptate.
        </p>
      </section>

      <button className={styles.add_wishlist_btn}>Add to Wishlist</button>
    </div>
  );
}
