const express = require("express");
const router = express.Router();
const { auth, restrictTo } = require("../middlewares/auth");
const {
  deleteTodo,
  updateTodo,
  addNewTodo,
  getTodoById,
  getAllTodos,
} = require("../controllers/todos");

router.get("/", auth, restrictTo("admin", "user"), getAllTodos);

router.get("/:id", auth, restrictTo("admin"), getTodoById);

router.post("/", auth, addNewTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
