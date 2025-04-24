const express = require("express");
const router = express.Router();
const { getAllUsers, addUser, login } = require("../controllers/users");
const { restrictTo } = require("../middlewares/auth");
const { validation } = require("../middlewares/validation");
const registerSchema = require("../validation/register.validation");

router.get("/", getAllUsers);
router.post("/", validation(registerSchema), addUser);
router.post("/login", login);

module.exports = router;
