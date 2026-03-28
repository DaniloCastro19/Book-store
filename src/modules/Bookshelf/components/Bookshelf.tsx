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
    query,
    setQuery,
    volumes,
    loading,
    printType,
    setPrintType,
    orderBy,
    setOrderBy,
    page,
    setPage,
  } = useSearch();

  return (
    <Container className={styles["mt-4"]}>
      <SearchBar query={query} setQuery={setQuery} />
      <section className={styles.filter_container}>
        <FilterBar printType={printType} setPrintType={setPrintType} />
        <SortBar orderBy={orderBy} setOrderBy={setOrderBy} />
      </section>

      {loading && <h5>Loading Books...</h5>}
      {!loading && (
        <BookStock
          volumes={volumes}
        />
      )}

      <PaginationBar page={page} setPage={setPage} />
    </Container>
  );
}
