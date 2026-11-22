import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

function TaskForm({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    ...(task || {}),
  }));

  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...formData,
      title: formData.title.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">
              {task ? "UPDATE YOUR WORK" : "ADD TO YOUR WORKSPACE"}
            </p>

            <h2 id="task-form-title">
              {task ? "Edit task" : "Create a task"}
            </h2>

            <p className="modal-subtitle">
              Add the details so you know exactly what to do.
            </p>
          </div>

          <button
            className="icon-button"
            type="button"
            onClick={onCancel}
            aria-label="Close task form"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="task-title">
              Task title <span aria-hidden="true">*</span>
            </label>

            <input
              ref={titleInputRef}
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to get done?"
              maxLength={90}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description">
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a few details about this task..."
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-category">
              Category <span aria-hidden="true">*</span>
            </label>

            <input
              id="task-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Design, Development"
              maxLength={40}
              required
            />
          </div>

          <div className="form-two-columns">
            <div className="form-field">
              <label htmlFor="task-status">
                Status
              </label>

              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>To do</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority">
                Priority
              </label>

              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="task-due-date">
              Due date <span aria-hidden="true">*</span>
            </label>

            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="submit"
            >
              {task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;