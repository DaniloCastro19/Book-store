import { useState, useEffect } from "react";
import type { State } from "../../../core/models/Book";
import { bookService } from "../../Book/services/BookService";

export const useBookAvailability = (googleId: string) => {
  const [state, setState] = useState<State>("Available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const book = await bookService.getBookByGoogleId(googleId);

        if (!book || !book.id) {
          setState("Available");
        } else if (book.loans && book.loans.length > 0) {
          // If there are loans returned by this endpoint, they are already filtered as ACTIVE/OVERDUE in backend
          setState("Borrowed");
        } else {
          setState("Available");
        }
      } catch (error) {
        console.error("Error on checking book availability: ", error);
        setState("Available");
      } finally {
        setLoading(false);
      }
    };

    if (googleId) {
      checkAvailability();
    }
  }, [googleId]);

  return { state, loading };
};
