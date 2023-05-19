const pool = require("../config/database");

const getAlltodos = async (req, res) => {
  try {
    const query = "SELECT * FROM todo ORDER BY id DESC";
    const result = await pool.query(query);
    const todo = result.rows;

    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the todo." });
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

const updateAnyTodos = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { todo } = req.body;

  try {
    const query = "UPDATE todo SET todo = $1 WHERE id = $2";
    const values = [todo, id];
    const result = await pool.query(query, values);

    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo." });
  }
};

const deleteAnyTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM todo WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);

    res.json(result);
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
  updateAnyTodos,
  deleteAnyTodos,
};
