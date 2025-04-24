const todosModel = require("../models/todos");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
console.log("appear");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  // try {
  console.log("entered");
  let todos = await todosModel.find().populate("userId");
  res.status(200).send({ status: "success", data: todos });
  // } catch (err) {
  //   res.status(422).json({ status: "failed", message: err.message });
  // }
});

exports.getTodoById = catchAsync(async (req, res, next) => {
  // try {
  console.log(req.params);
  let { id } = req.params;
  let todo = await todosModel.findById(id);
  if (!todo) {
    return next(new AppError(404, "todo not found"));
  }
  res.status(200).json({ status: "success", data: todo });
  // } catch (err) {
  //   res.status(500).json({ status: "fail", message: err.message });
  // }
});

exports.addNewTodo = catchAsync(async (req, res, next) => {
  // try {
  let newTodo = req.body;
  if (!newTodo.title) {
    return next(new AppError(400, "Title is required", "fail"));
  }
  let todo = await todosModel.create({ ...newTodo, userId: req.id });
  res.status(201).send({ status: "success", data: todo });
  // } catch (err) {
  //   res.status(422).send({ status: "fail", message: err.message });
  // }
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  // try {
  let { id } = req.params;
  let newTitle = req.body.title;
  const todo = await todosModel.findByIdAndUpdate(id, { title: newTitle });
  if (!todo) {
    return next(new AppError(404, "todo not found", "fail"));
  }
  res.status(201).send({ status: "success", data: todo });
  // } catch (err) {
  //   res.status(422).send({ status: "fail", message: err.message });
  // }
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  // try {
  let { id } = req.params;
  const todo = await todosModel.findByIdAndDelete(id);
  if (!todo) {
    return next(new AppError(404, "todo not found", "fail"));
  }
  res.status(201).send({ status: "success", data: todo });
  // } catch (err) {
  //   res.status(422).send({ status: "fail", message: err.message });
  // }
});
