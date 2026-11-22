import { SlidersHorizontal } from "lucide-react";

const statuses = [
  "All",
  "To do",
  "In progress",
  "Completed",
];

function FilterTabs({
  activeStatus,
  onStatusChange,
  activePriority,
  onPriorityChange,
}) {
  return (
    <div className="filters-row" aria-label="Task filters">
      <div
        className="status-tabs"
        role="group"
        aria-label="Filter by status"
      >
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-tab ${
              activeStatus === status ? "active" : ""
            }`}
            onClick={() => onStatusChange(status)}
            aria-pressed={activeStatus === status}
          >
            {status}
          </button>
        ))}
      </div>

      <label className="priority-filter">
        <SlidersHorizontal size={16} aria-hidden="true" />

        <span className="sr-only">
          Filter by priority
        </span>

        <select
          value={activePriority}
          onChange={(event) =>
            onPriorityChange(event.target.value)
          }
          aria-label="Filter by priority"
        >
          <option value="All">All priorities</option>
          <option value="High">High priority</option>
          <option value="Medium">Medium priority</option>
          <option value="Low">Low priority</option>
        </select>
      </label>
    </div>
  );
}

export default FilterTabs;