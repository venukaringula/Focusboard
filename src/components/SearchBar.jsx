import { Search, X } from "lucide-react";

function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="search-field">
      <Search size={18} aria-hidden="true" />

      <input
        type="search"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
      />

      {searchText && (
        <button
          className="clear-search"
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;