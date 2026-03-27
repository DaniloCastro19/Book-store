import type { BookVolume } from "../../../core/models/Book";
import BookCard from "./BookCard";
import styles from "./BookStock.module.scss";

type BookStockProps = {
  volumes: BookVolume[];
};

export default function BookStock({volumes}: BookStockProps) {
  if (!volumes.length) {
    return <h1>Make a search to show books availables</h1>;
  }
  return (
    <section className={styles.bookstock_container}>
      {volumes.map((volume) => (
        <BookCard
          key={volume.id}
          title={volume.volumeInfo.title}
          authors={volume.volumeInfo.authors}
          state="Available"
          imageLinks={volume.volumeInfo.imageLinks}
        />
      ))}
    </section>
  );
}
