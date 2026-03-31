import React from "react";
import type { BookVolume } from "../../../core/models/Book";
import BookCard from "./BookCard";
import styles from "./BookStock.module.scss";

type BookStockProps = {
  volumes: BookVolume[];
};

function BookStock({volumes}: BookStockProps) {
  if (!volumes || !volumes.length) {
    return <h1>No volumes found. Make a search to show books volumes availables</h1>;
  }
  return (
    <section className={styles.bookstock_container}>
      {volumes.map((volume) => (
        <BookCard
          key={volume.id}
          id={volume.id}
          title={volume.volumeInfo.title}
          authors={volume.volumeInfo.authors}
          state="Available"
          imageLinks={volume.volumeInfo.imageLinks}
        />
      ))}
    </section>
  );
}
export default React.memo(BookStock);
