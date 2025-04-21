const todosModel = require("../models/todos");

exports.getAllTodos = async (req, res) => {
  try {
    let todos = await todosModel.find().populate("userId");
    res.status(200).send({ status: "success", data: todos });
  } catch (err) {
    res.status(422).json({ status: "failed", message: err.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    let { id } = req.params;
    let todo = await todosModel.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "todo not found" });
    }
    res.status(200).json({ status: "success", data: todo });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.addNewTodo = async (req, res) => {
  try {
    let newTodo = req.body;
    let todo = await todosModel.create(newTodo);
    res.status(201).send({ status: "success", data: todo });
  } catch (err) {
    res.status(422).send({ status: "fail", message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let newTitle = req.body.title;
    const todo = await todosModel.findByIdAndUpdate(id, { title: newTitle });
    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "todo not found" });
    }
    res.status(201).send({ status: "success", data: todo });
  } catch (err) {
    res.status(422).send({ status: "fail", message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let { id } = req.params;
    const todo = await todosModel.findByIdAndDelete(id);
    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "todo not found" });
    }
    res.status(201).send({ status: "success", data: todo });
  } catch (err) {
    res.status(422).send({ status: "fail", message: err.message });
  }
};
