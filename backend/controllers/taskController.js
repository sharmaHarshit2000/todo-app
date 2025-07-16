const tasks = require("../data/tasks.js")

// GET /tasks - fetch all tasks

const getTasks = (req, res) => {
  try {
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching tasks." });
  }
};

// POST /tasks - add a new task

const addTask = (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required." });
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Server error while adding task." });
  }
};

// PUT /tasks/:id - toggle completed status

const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    task.completed = !task.completed;

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating task." });
  }
};

// DELETE /tasks/:id - delete task

const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Task not found." });
    }
    tasks.splice(index, 1);

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting task." });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
