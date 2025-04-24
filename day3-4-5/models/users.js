const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,10}(@)(gmail|yahoo)(.com)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

usersSchema.pre("save", async function (next) {
  let salt = await bcryptjs.genSalt(10);
  let hashedPasswd = await bcryptjs.hash(this.password, salt);
  this.password = hashedPasswd;
  next();
});

const usersModel = mongoose.model("User", usersSchema);
module.exports = usersModel;
