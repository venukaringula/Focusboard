import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <section className="task-section" id="tasks">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">KEEP MOVING FORWARD</p>

          <h2>Your tasks</h2>

          <p className="section-subtitle">
            Everything you’re working on, all in one place.
          </p>
        </div>

        <span className="task-total">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">
            <ClipboardList size={25} />
          </span>

          <h3>No tasks match your filters</h3>

          <p>
            Try another search or filter, or create a new task.
          </p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;