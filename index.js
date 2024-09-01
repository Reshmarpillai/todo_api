const express = require("express");
const app = express();
const port = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));

// middleware to parse json file
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  console.log("server running");
  res.send("Hello from server");
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
  };
  todos.push(newTodo);
  console.log("new to do created");
  res.status(201).json(newTodo);
});

app.get("/todos", (req, res) => {
  // res.send('new todos')
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const Id = parseInt(req.params.id, 10);
  const todosId = todos.find((t) => t.id === Id);
  if (todosId !== -1) {
    res.json(todosId);
  } else {
    res.status(404).json({ message: "todo id not found" });
  }
});

// PUT (update) a todo by ID
app.put("/todos/:id", (req, res) => {
  const Id = parseInt(req.params.id, 10);
  const todosId = todos.find((t) => t.id === Id);
  if (todosId !== -1) {
    todos[todosId] = { ...todos[todosId], ...req.body };
    res.json(todos[todosId]);
  } else {
    res.status(404).json({ message: "Todos id not found" });
  }
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
    const Id = parseInt(req.params.id, 10);
    const todosId = todos.find((t) => t.id === Id);
    if (todosId !== -1) {
      todos.splice(todosId,1);
      res.json({message:"to do deleted"});
    } else {
      res.status(404).json({ message: "Todos id not found" });
    }
  });


app.listen(port, () => {
  console.log(`Server is listening at port, ${port}`);
});
