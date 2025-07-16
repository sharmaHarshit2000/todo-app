import { useState } from "react";
import { addTask } from "../api/api";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warn("Task title cannot be empty.");
      return;
    }

    try {
      await addTask({ title: title.trim() });
      setTitle("");
      toast.success("Task added successfully.");
      onTaskAdded();
    } catch (err) {
      toast.error(
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
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        <FaPlus /> Add
      </button>
    </form>
  );
};

export default TaskForm;
