const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is reqired"],
    unique: [true, "title must be unique"],
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  status: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const todosModel = mongoose.model("Todo", todosSchema);
module.exports = todosModel;
