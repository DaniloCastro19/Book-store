import "./SearchBar.css";
import useSearch from "../hooks/UseSearch";

export default function SearchBar() {
  const {query, setQuery} = useSearch();

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search for titles..."
        className="searchBar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <img
        src="src/assets/search_icon_black.png"
        alt="SearchBarIcon"
        className="searchIcon"
      />
    </div>
  );
}
