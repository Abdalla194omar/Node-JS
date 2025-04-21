const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  deleteTodo,
  updateTodo,
  addNewTodo,
  getTodoById,
  getAllTodos,
} = require("../controllers/todos");
router.use(auth);
router.get("/", getAllTodos);

router.get("/:id", getTodoById);

router.post("/", addNewTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
