import { useState } from "react";
import { addTask } from "../api/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }

    try {
      await addTask({ title });
      setTitle("");
      setError(null); 
      onTaskAdded();
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to add task"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 p-2 rounded"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default TaskForm;
