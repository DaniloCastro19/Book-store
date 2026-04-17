import styles from "./Accordion.module.scss";

interface AccordionProps {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Accordion = ({
  title,
  count,
  isOpen,
  onToggle,
  children,
}: AccordionProps) => {
  return (
    <div className={styles.accordion_section}>
      <div className={styles.accordion_header} onClick={onToggle}>
        <h2>
          {title} <span className={styles.count}>{count}</span>
        </h2>
        <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>▼</span>
      </div>
      {isOpen && <div className={styles.accordion_content}>{children}</div>}
    </div>
  );
};
