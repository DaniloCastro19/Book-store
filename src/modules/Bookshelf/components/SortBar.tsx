import styles from "./SortBar.module.scss";
import { Form } from "react-bootstrap";

type SortBarProps = {
  orderBy: string;
  setOrderBy: (value: string) => void;
};

export default function SortBar({ orderBy, setOrderBy }: SortBarProps) {
  return (
    <Form.Select
      className={styles["mb-3"]}
      value={orderBy}
      onChange={(e) => setOrderBy(e.target.value)}
    >
      <option value="relevance">Relevance</option>
      <option value="newest">Newest</option>
    </Form.Select>
  );
}
