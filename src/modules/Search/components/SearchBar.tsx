import "./SearchBar.css"
export default function SearchBar() {
  return (
    <div className="searchContainer">
      <input type="text" placeholder="Search for titles..." className="searchBar"/>
      <img src="src/assets/search_icon_black.png" alt="SearchBarIcon" className="searchIcon"/>
    </div>
  );
}
