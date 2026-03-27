import type { BookVolume } from "../../../core/models/Book";
import BookCard from "./BookCard";

type BookStockProps = {
  volumes: BookVolume[];
};

export default function BookStock({volumes}: BookStockProps) {
  if (!volumes.length) {
    return <h1>Make a search to show books availables</h1>;
  }
  return (
    <section>
      {volumes.map((volume) => (
        <BookCard
          key={volume.id}
          title={volume.volumeInfo.title}
          authors={volume.volumeInfo.authors}
          imageLinks={volume.volumeInfo.imageLinks}
        />
      ))}
    </section>
  );
}
