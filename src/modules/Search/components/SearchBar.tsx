import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  const searchIcon = new URL("/search_icon_black.png", import.meta.url)
    .href;
  return (
    <div className={styles.search_container}>
      <input
        type="text"
        placeholder="Search for titles..."
        className={styles.searchbar}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <img
        src={searchIcon}
        alt="SearchBarIcon"
        className={styles.search_icon}
      />
    </div>
  );
}
