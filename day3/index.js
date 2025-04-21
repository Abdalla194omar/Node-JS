const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const todosRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");
const dotenv = require("dotenv");
const todosModel = require("./models/todos");

dotenv.config();
// connecting with database
mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Middleware to solve problem of cors
app.use(express.static("./static")); // Middleware to serve static files
// dealing with views
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/todos/views", async (req, res) => {
  let todos = await todosModel.find();
  console.log(todos);
  res.render("todos", { todos });
});
// /////////////////////
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);
// not found page
app.use((req, res, next) => {
  res.status(404).json({ status: "failed", message: "route not found" });
});

///error handling
app.use((err, req, res, next) => {
  res.status(500).json({ status: "failed", message: "try again later" });
});
// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
