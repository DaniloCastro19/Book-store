import { useState, useEffect } from "react";
import type { State } from "../../../core/models/Book";
import { env } from "../../../env/environment.development";

export const useBookAvailability = (googleId: string) => {
  const [state, setState] = useState<State>("Available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const response = await fetch(`${env.APIbaseUrl}/books/google/${googleId}`);
        const book = await response.json();

        if (!book || !book.loans) {
          setState("Available");
        } else if (
          book.loans.status === "ACTIVE" ||
          book.loans.status === "OVERDUE"
        ) {
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
