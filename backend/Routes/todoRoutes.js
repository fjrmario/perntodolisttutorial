const express = require("express");
const router = express.Router();
const {
  getAlltodos,
  createNewTodos,
  updateAnyTodos,
  deleteAnyTodos,
} = require("../Controllers/todoControllers");

//get all to do list
router.get("/", getAlltodos);

// create a new to do list
router.post("/", createNewTodos);

//delete a todolist
router.delete("/:id", deleteAnyTodos);

//edit todos
router.put("/:id", updateAnyTodos);

module.exports = router;
