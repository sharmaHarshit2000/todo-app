import { useEffect, useState } from "react";
import { fetchTasks } from "./api/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTasks();
      setTasks(res.data.tasks);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to load tasks";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

        {loading && <p className="text-blue-600 mb-2 text-center">Loading tasks...</p>}
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <TaskForm onTaskAdded={getTasks} />
        <TaskList tasks={tasks} onUpdate={getTasks} />
      </div>
    </div>
  );
}

export default App;
