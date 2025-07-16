import { useState } from "react";
import { toggleTask, deleteTask } from "../api/api";

const TaskList = ({ tasks, onUpdate }) => {
  const [error, setError] = useState(null);

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      setError(null);
      onUpdate();
    } catch (err) {
      // Extract error from Axios or fallback
      setError(
        err?.response?.data?.message || err.message || "Failed to toggle task"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setError(null);
      onUpdate();
    } catch (err) {
      // Extract error from Axios or fallback
      setError(
        err?.response?.data?.message || err.message || "Failed to delete task"
      );
    }
  };

  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center">No tasks yet.</p>;
  }

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => handleToggle(task.id)}
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`} // Conditional styling for completed tasks
            >
              {task.title}
            </span>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:underline text-sm ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
