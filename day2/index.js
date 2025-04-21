const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const FILE_PATH = "data.json";

// Helper to read todos from the file
function readTodos(callback) {
  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) return callback(err, null);
    try {
      const todos = JSON.parse(data);
      callback(null, todos);
    } catch (e) {
      callback(e, null);
    }
  });
}

// Helper to write todos to the file
function writeTodos(todos, callback) {
  fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2), callback);
}

// GET all todos
app.get("/todos", (req, res) => {
  readTodos((err, todos) => {
    if (err) return res.status(500).send("Error reading file.");
    res.json({ data: todos, status: "ok" });
  });
});

// GET a single todo by ID
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  readTodos((err, todos) => {
    if (err) return res.status(500).send("Error reading file.");
    const todo = todos.find((t) => t.id == id);
    todo
      ? res.json({ data: todo.title, status: "ok" })
      : res.status(404).json({ data: "Not Found", status: "error" });
  });
});

// POST a new todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send("Title is required.");

  readTodos((err, todos) => {
    if (err) return res.status(500).send("Error reading file.");
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    todos.push({ id: newId, title });
    writeTodos(todos, (err) => {
      if (err) return res.status(500).send("Error writing file.");
      res.status(201).send(`Todo with ID ${newId} added successfully.`);
    });
  });
});

// PATCH (update) a todo by ID
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  if (!title) return res.status(400).send("Title is required.");

  readTodos((err, todos) => {
    if (err) return res.status(500).send("Error reading file.");
    let todoFound = false;

    todos = todos.map((todo) => {
      if (todo.id == id) {
        todo.title = title;
        todoFound = true;
      }
      return todo;
    });

    if (!todoFound)
      return res.status(404).send(`Todo with ID ${id} not found.`);

    writeTodos(todos, (err) => {
      if (err) return res.status(500).send("Error writing file.");
      res.send(`Todo with ID ${id} updated successfully.`);
    });
  });
});

// DELETE a todo by ID
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  readTodos((err, todos) => {
    if (err) return res.status(500).send("Error reading file.");
    const index = todos.findIndex((todo) => todo.id == id);
    if (index === -1)
      return res.status(404).send(`Todo with ID ${id} not found.`);

    todos.splice(index, 1);
    writeTodos(todos, (err) => {
      if (err) return res.status(500).send("Error writing file.");
      res.send(`Todo with ID ${id} deleted successfully.`);
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// const express = require("express");
// const fs = require("fs");
// const app = express();

// app.listen(3000, () => {});

// app.get("/todos", (req, res) => {
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     let todos = JSON.parse(data);
//     res.json({
//       data: todos,
//       status: "new",
//     });
//   });
// });

// app.get("/todos/:id", (req, res) => {
//   let id = req.params.id;
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     let todos = JSON.parse(data);
//     let todo = todos.find((element) => element.id == id);

//     todo
//       ? res.json({
//           data: todo.title,
//           status: "new",
//         })
//       : res.json({
//           data: "not Found",
//           status: "new",
//         });
//   });
// });

// app.use(express.json());

// app.post("/todos", (req, res) => {
//   let newTodo = req.body;
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     let todos = JSON.parse(data);
//     let newId = todos[todos.length - 1].id + 1;
//     let newTitle = newTodo.title;
//     todos.push({ id: newId, title: newTitle });
//     fs.writeFile("data.json", JSON.stringify(todos), (err) => {
//       res.send(`todo with id ${newId} added successfully`);
//     });
//   });
// });

// app.patch("/todos/:id", (req, res) => {
//   let id = req.params.id;
//   let newTitle = req.body.title;
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     let todos = JSON.parse(data);
//     todos
//       .filter((element) => element.id == id)
//       .map((todo) => (todo.title = newTitle));
//     fs.writeFile("data.json", JSON.stringify(todos), (err) => {
//       res.send(`todo with id ${id} updated successfully`);
//     });
//   });
// });

// app.delete("todos/:id", (req, res) => {
//   let id = req.params.id;
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     let todos = JSON.parse(data);
//     let indexOfDeleted = todos.findIndex((element) => element.id == id);
//     if (indexOfDeleted > -1) {
//       todos.splice(indexOfDeleted, 1);
//       fs.writeFile("data.json", JSON.stringify(todos), (err) => {
//         res.send(`todo with id ${id} deleted successfully`);
//       });
//     } else {
//       res.send(`todo with id ${id} not exist successfully`);
//     }
//   });
// });
