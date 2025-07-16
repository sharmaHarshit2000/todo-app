import { useState } from "react";
import { toggleTask, deleteTask } from "../api/api";
import { toast } from "react-toastify";
import { FaTrash, FaCheck } from "react-icons/fa";

const TaskList = ({ tasks, onUpdate }) => {

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      toast.success("Task updated");
      onUpdate();
    } catch (err) {
      // Extract error from Axios or fallback
      toast.error(
        err?.response?.data?.message || err.message || "Failed to toggle task"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      onUpdate();
    } catch (err) {
      // Extract error from Axios or fallback
      toast.error(
        err?.response?.data?.message || err.message || "Failed to delete task"
      );
    }
  };

  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center">No tasks yet.</p>;
  }

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => handleToggle(task.id)}
              className={`flex-1 cursor-pointer flex items-center gap-2 
                ${task.completed ? "line-through text-gray-500" : ""
                }`} // Conditional styling for completed tasks
            >
              {task.completed && <FaCheck className="text-green-500" />}
              {task.title}
            </span>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:underline text-sm ml-4"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
