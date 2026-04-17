import { useEffect, useState } from "react";
import type { LoanResponse } from "../../../core/models/Loan";
import { useAuth } from "../../Auth/context/UseAuthContext";
import { loanService } from "../services/LoanService";

export default function useLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.sub) return;
      try {
        setLoading(true);
        const data = await loanService.getLoansByUser(user.sub);
        setLoans(data);
      } catch (err) {
        console.error("Error fetching loans:", err);
        setError("Could not load loans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  return { loans, loading, error };
}
