import type { Book } from "../../../core/models/Book";

export default function BookCard({ title, authors, imageLinks }: Book) {
  return (
    <article className="bookCard">
      <img src={imageLinks ? imageLinks.thumbnail : "https://placehold.co/100x100" } alt="Book Cover" />
      <h1>{title}</h1>
      <h2>Authors: {JSON.stringify(authors)}</h2>
      <button className="wishlistButton">Add to Wishlist</button>
    </article>
  );
}
