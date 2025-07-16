const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");


dotenv.config();

const app = express();

//Middlewares
app.use(express.json()) //body parser
app.use(cors());

//Routes
app.use("/tasks", taskRoutes);

//For testing the API is working
app.get("/", (req, res) => {
    res.send("API is running...")
})

// Middleware (For notFound(404) Routes and Error handling )
app.use(notFound);        
app.use(errorHandler);    

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
