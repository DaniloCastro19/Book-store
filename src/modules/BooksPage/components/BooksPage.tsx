import SearchBar from "../../Search/components/SearchBar";
import BookStock from "./BooksStock";
import useSearch from "../../Search/hooks/UseSearch";

export default function BooksPage() {
  const {query, setQuery, volumes, loading} = useSearch();
  
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      {loading && <h1>Loading Books...</h1>}
      {!loading && <BookStock volumes={volumes}/>}
    </>
  );
}
