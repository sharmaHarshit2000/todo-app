const express = require("express");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");


dotenv.config();

const app = express();

app.use("/tasks", taskRoutes);

//For testing the API is working
app.get("/", (req, res) => {
    res.send("API is running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
