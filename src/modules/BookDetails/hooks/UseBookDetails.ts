import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env } from "../../../env/environment.development";
import type { BookVolume } from "../../../core/models/Book";

export default function useBookDetails() {
  const { id } = useParams<string>();
  const [book, setBook] = useState<BookVolume | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${env.APIVolumesURl}/${id}?key=${env.booksAPIKey}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error on details fetch: ${res.status}`);
        }

        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);
  return {
    id,
    book,
    loading,
  };
}
