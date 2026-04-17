import React from "react";
import type { BookVolume } from "../../../core/models/Book";
import BookCard from "./BookCard";
import styles from "./BookStock.module.scss";
import { useBookAvailability } from "../hooks/UseBookAvailability";

type BookStockProps = {
  volumes: BookVolume[];
};

const BookStockItem = ({ volume }: { volume: BookVolume }) => {
  const { state } = useBookAvailability(volume.id);

  return (
    <BookCard
      key={volume.id}
      id={volume.id}
      title={volume.volumeInfo.title}
      authors={volume.volumeInfo.authors}
      state={state}
      imageLinks={volume.volumeInfo.imageLinks}
    />
  );
};

function BookStock({ volumes }: BookStockProps) {
  if (!volumes || !volumes.length) {
    return (
      <h1>No volumes found. Make a search to show books volumes availables</h1>
    );
  }
  return (
    <section className={styles.bookstock_container}>
      {volumes.map((volume) => (
        <BookStockItem key={volume.id} volume={volume} />
      ))}
    </section>
  );
}
export default React.memo(BookStock);
