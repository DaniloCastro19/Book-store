import { useState } from "react";
import { Accordion } from "./Accordion";
import { LoanCard } from "./LoanCard";
import styles from "./LoanList.module.scss";
import useLoans from "../hooks/UseLoans";

export default function LoanList() {
  const { loans, loading, error } = useLoans();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    OVERDUE: true,
    ACTIVE: true,
    RETURNED: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading)
    return <div className={styles.loading_spinner}>Loading your loans...</div>;
  if (error) return <div className={styles.error_container}>{error}</div>;

  const overdueLoans = loans.filter((l) => l.status === "OVERDUE");
  const activeLoans = loans.filter((l) => l.status === "ACTIVE");
  const returnedLoans = loans.filter((l) => l.status === "RETURNED");

  return (
    <div className={styles.loan_list_container}>
      <h1>My Book Loans</h1>

      <Accordion
        title="Overdue Loans"
        count={overdueLoans.length}
        isOpen={openSections.OVERDUE}
        onToggle={() => toggleSection("OVERDUE")}
      >
        {overdueLoans.length > 0 ? (
          overdueLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
        ) : (
          <p className={styles.empty_message}>No overdue loans. Great job!</p>
        )}
      </Accordion>

      <Accordion
        title="Active Loans"
        count={activeLoans.length}
        isOpen={openSections.ACTIVE}
        onToggle={() => toggleSection("ACTIVE")}
      >
        {activeLoans.length > 0 ? (
          activeLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
        ) : (
          <p className={styles.empty_message}>No active loans currently.</p>
        )}
      </Accordion>

      <Accordion
        title="Returned Loans"
        count={returnedLoans.length}
        isOpen={openSections.RETURNED}
        onToggle={() => toggleSection("RETURNED")}
      >
        {returnedLoans.length > 0 ? (
          returnedLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
        ) : (
          <p className={styles.empty_message}>No returned loans history yet.</p>
        )}
      </Accordion>
    </div>
  );
}
