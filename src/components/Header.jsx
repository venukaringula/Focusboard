import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";

function Header({ searchText, onSearchChange, onAddTask }) {
  return (
    <header className="page-header" id="dashboard">
      <div className="page-heading">
        <p className="eyebrow">YOUR WORKSPACE</p>

        <h1>Good things happen when you focus.</h1>

        <p className="page-subtitle">
          Here’s an overview of your tasks and progress.
        </p>
      </div>

      <div className="header-tools">
        <SearchBar
          searchText={searchText}
          onSearchChange={onSearchChange}
        />

        <button
          className="primary-button"
          type="button"
          onClick={onAddTask}
        >
          <Plus size={18} />
          <span>New task</span>
        </button>
      </div>
    </header>
  );
}

export default Header;