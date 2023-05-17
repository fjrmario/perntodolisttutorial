const express = require("express");
const router = express.Router();
const { createNewTodos } = require("../Controllers/todoControllers");

//get all to do list
router.get("/");

// create a new to do list
router.post("/", createNewTodos);

//delete a todolist
router.delete("/:id");

//edit todos
router.put("/");

module.exports = router;
