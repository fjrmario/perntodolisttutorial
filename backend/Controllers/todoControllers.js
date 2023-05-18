const pool = require("../config/database");

const getAlltodos = async (req, res) => {
  try {
    const query = "SELECT * FROM todo";
    const result = await pool.query(query);
    const todo = result.rows;

    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo." });
  }
};

const createNewTodos = async (req, res) => {
  const { todo } = req.body;
  try {
    const query = "INSERT INTO todo (todo) VALUES ($1) RETURNING *";
    const values = [todo];
    const result = await pool.query(query, values);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo." });
  }
};

module.exports = {
  getAlltodos,
  createNewTodos,
};
