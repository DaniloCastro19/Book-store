import { Form } from "react-bootstrap";
import "../../../styles/_variables.scss";
import styles from "./FilterBar.module.scss";

type FilterBarProps = {
  printType: string;
  setPrintType: (value: string) => void;
};

export default function FilterBar({ printType, setPrintType }: FilterBarProps) {
  return (
    <Form.Select
      className={styles["mb-3"]}
      value={printType}
      onChange={(e) => setPrintType(e.target.value)}
    >
      <option value="all">All</option>
      <option value="books">Books</option>
      <option value="magazines">Magazines</option>
    </Form.Select>
  );
}
