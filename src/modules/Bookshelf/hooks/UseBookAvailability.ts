import { useState, useEffect } from "react";
import type { State } from "../../../core/models/Book";
import { bookService } from "../services/BookService";

export const useBookAvailability = (googleId: string) => {
  const [state, setState] = useState<State>("Available");
  const [userId, setUserId] = useState<string | null>(null);
  const [loanId, setLoanId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const book = await bookService.getBookByGoogleId(googleId);

        if (!book || !book.id) {
          setState("Available");
          setUserId(null);
        } else if (book.loans && book.loans.length > 0) {
          // If there are loans returned by this endpoint, they are already filtered as ACTIVE/OVERDUE in backend
          setState("Borrowed");
          setUserId(book.loans[0]?.userId || null);
          setLoanId(book.loans[0]?.id || null);
        } else {
          setState("Available");
          setUserId(null);
          setLoanId(null);
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

  return { state, userId, loanId, loading };
};
