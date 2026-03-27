import SearchBar from "../../Search/components/SearchBar";
import BookStock from "./BooksStock";
import useSearch from "../../Search/hooks/UseSearch";

import styles from "./Bookshelf.module.scss";

export default function Bookshelf() {
  const {query, setQuery, volumes, loading} = useSearch();
  
  return (
    <div className={styles.bookshelf_container}>
      <SearchBar query={query} setQuery={setQuery} />
      {loading && <h1>Loading Books...</h1>}
      {!loading && <BookStock volumes={volumes}/>}
    </div>
  );
}
