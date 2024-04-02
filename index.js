const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./Models/Todo");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/todolist')
mongoose.connect(process.env.DB_URL);

app.get("/get", async (req, res) => {
  const todos = await Todo.find();
  console.log("/get 호출");
  console.log(todos);
  res.json(todos);
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  todo.done = !todo.done;
  todo.save();
  console.log("/update/:id 호출");
  console.log(todo);
  res.json(todo);
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const todos = await Todo.findByIdAndDelete({ _id: id });
  console.log("/delete/:id 호출");
  console.log(todos);
  res.json(todos);
});

app.post("/add", async (req, res) => {
  const task = req.body.task;
  const todos = await Todo.create({ task: task });
  console.log("/add 호출");
  console.log(todos);
  res.json(todos);
});

app.listen(3001, () => {
  console.log("Server is Running!");
});
