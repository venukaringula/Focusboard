import { useMemo, useState } from "react";

import {
  CheckCircle2,
  CircleDashed,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";

function createTaskId() {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function App() {
  // Store tasks in localStorage
  const [tasks, setTasks] = useLocalStorage(
    "focusboard-tasks",
    sampleTasks
  );

  // Search and filter states
  const [searchText, setSearchText] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activePriority, setActivePriority] = useState("All");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Calculate statistics
  const totalTasks = tasks.length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedCount / totalTasks) * 100);

  // Search and filter tasks
  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesStatus =
        activeStatus === "All" ||
        task.status === activeStatus;

      const matchesPriority =
        activePriority === "All" ||
        task.priority === activePriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    searchText,
    activeStatus,
    activePriority,
  ]);

  // Open create task form
  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  // Open edit task form
  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Close task form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Save new or edited task
  const saveTask = (formData) => {
    if (editingTask) {
      // Update existing task
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      // Create new task
      setTasks((currentTasks) => [
        {
          ...formData,
          id: createTaskId(),
        },
        ...currentTasks,
      ]);
    }

    closeForm();
  };

  // Delete task with confirmation
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find(
      (task) => task.id === taskId
    );

    if (!taskToDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${taskToDelete.title}"? This action cannot be undone.`
    );

    if (confirmed) {
      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="content-wrap">

          {/* Page header */}
          <Header
            searchText={searchText}
            onSearchChange={setSearchText}
            onAddTask={openCreateForm}
          />

          {/* Statistics */}
          <section
            className="stats-grid"
            aria-label="Task statistics"
          >
            <StatCard
              title="Total tasks"
              value={totalTasks}
              description="Tasks in your workspace"
              icon={<ListTodo size={19} />}
              tone="purple"
            />

            <StatCard
              title="In progress"
              value={inProgressCount}
              description="Currently being worked on"
              icon={<CircleDashed size={19} />}
              tone="orange"
            />

            <StatCard
              title="Completed"
              value={completedCount}
              description="Tasks you have finished"
              icon={<CheckCircle2 size={19} />}
              tone="green"
            />

            <StatCard
              title="Completion rate"
              value={`${completionRate}%`}
              description="Of all tasks completed"
              icon={<TrendingUp size={19} />}
              tone="blue"
            />
          </section>

          {/* Focus notes carousel */}
          <FocusNotes />

          {/* Task filters */}
          <FilterTabs
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            activePriority={activePriority}
            onPriorityChange={setActivePriority}
          />

          {/* Task list */}
          <TaskList
            tasks={filteredTasks}
            onEdit={openEditForm}
            onDelete={deleteTask}
          />

        </div>
      </main>

      {/* Create/Edit task modal */}
      {isFormOpen && (
        <TaskForm
          key={
            editingTask
              ? editingTask.id
              : "new-task"
          }
          task={editingTask}
          onSave={saveTask}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}

export default App;