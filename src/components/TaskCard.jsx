import { CalendarDays, Pencil, Trash2 } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) {
    return "No due date";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function TaskCard({ task, onEdit, onDelete }) {
  const statusClass = task.status.toLowerCase().replaceAll(" ", "-");

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`status-badge ${statusClass}`}>
          {task.status}
        </span>

        <div className="task-card-actions">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description || "No description provided."}
      </p>

      <div className="task-meta">
        <span className="category-chip">
          {task.category}
        </span>

        <span className={`priority-chip ${task.priority.toLowerCase()}`}>
          <span className="priority-dot" />
          {task.priority} priority
        </span>
      </div>

      <div className="task-card-bottom">
        <span>
          <CalendarDays size={15} />
          {formatDate(task.dueDate)}
        </span>
      </div>
    </article>
  );
}

export default TaskCard;