import "./SearchBar.css";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery}: SearchBarProps) {

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
