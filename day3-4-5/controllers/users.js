const usersModel = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");

exports.getAllUsers = async (req, res) => {
  try {
    let users = await usersModel.find();
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    res.status(422).json({ status: "fail", message: err.message });
  }
};
exports.addUser = async (req, res) => {
  try {
    let user = await usersModel.create(req.body);
    res.status(201).send({ status: "success", data: user });
  } catch (err) {
    res.status(422).json({ status: "fail", message: err.message });
  }
};
exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "you must provide email and password for login",
    });
  }
  let user = await usersModel.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "invalid email or password" });
  }
  let isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) {
    return res
      .status(401)
      .json({ status: "fail", message: "invalid email or password" });
  }
  let token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.SECRET
  );
  res.status(200).json({ status: "success", data: token });
};
