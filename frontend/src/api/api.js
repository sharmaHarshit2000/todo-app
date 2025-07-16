import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/tasks`,
});

// Get all tasks
export const fetchTasks = () => API.get("/");

// Add a task
export const addTask = (taskData) => API.post("/", taskData)

// Toggle task completion
export const toggleTask = (id) => API.put(`/${id}`);

// Delete task
export const deleteTask = (id) => API.delete(`/${id}`);