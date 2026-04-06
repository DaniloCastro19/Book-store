import { Container } from "react-bootstrap";
import SearchBar from "../../Search/components/SearchBar";
import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import PaginationBar from "./PaginationBar";
import useSearch from "../../Search/hooks/UseSearch";
import BookStock from "./BooksStock";
import styles from "./Bookshelf.module.scss";

export default function Bookshelf() {
  const {
    search,
    filters,
    data,
    pagination,
  } = useSearch();

  return (
    <Container className={styles["mt-4"]}>
      <SearchBar {...search} />
      <section className={styles.filter_container}>
        <FilterBar {...filters} />
        <SortBar {...filters} />
      </section>

      {data.loading && <h5>Loading Books...</h5>}
      {!data.loading && (
        <BookStock
          volumes={data.volumes}
        />
      )}

      <PaginationBar {...pagination}/>
    </Container>
  );
}
