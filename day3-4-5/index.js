const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AppError = require("./utils/AppError");

const app = express();
const todosRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");
const dotenv = require("dotenv");
const todosModel = require("./models/todos");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
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

app.post("/profile", upload.single("avatar"), (req, res, next) => {});
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
  // res.status(404).json({ status: "failed", message: "route not found" });
  next(new AppError(404, "route not found"));
});

///error handling
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid ID format" });
  } else if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ status: "fail", message: "Validation failed" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ status: "fail", message: "Token expired" });
  }
  res
    .status(err.statusCode || 500)
    .json({ status: "failed", message: err.message || "try again later" });
});
// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
