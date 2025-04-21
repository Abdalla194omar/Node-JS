const fs = require("fs");

let [, , command] = process.argv;

if (command == "add") {
  let [, , , title] = process.argv;
  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    todos.push({
      title,
      id: todos.length == 0 ? 1 : todos[todos.length - 1].id + 1,
      status: "todo",
    });
    fs.writeFile("data.json", JSON.stringify(todos), () => {});
  });
} else if (command == "list") {
  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    todos.forEach((element) => {
      console.log(element);
    });
  });
} else if (command == "delete") {
  let [, , , id] = process.argv;
  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    let indexOfDeleted = todos.findIndex((todo) => todo.id == id);
    if (indexOfDeleted > -1) {
      todos.splice(indexOfDeleted, 1);
    } else {
      console.log("id not existed");
    }
    fs.writeFile("data.json", JSON.stringify(todos), () => {});
  });
} else if (command == "update") {
  let [, , , id, title] = process.argv;
  fs.readFile("data.JSON", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    let indexToUpdate = todos.findIndex((todo) => todo.id == id);
    if (indexToUpdate > -1) {
      todos.filter((todo) => todo.id == id).map((item) => (item.title = title));
    } else {
      console.log("id not existed to be updated");
    }
    fs.writeFile("data.json", JSON.stringify(todos), () => {});
  });
}
