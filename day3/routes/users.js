const express = require("express");
const router = express.Router();
const { getAllUsers, addUser, login } = require("../controllers/users");

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", login);

module.exports = router;
