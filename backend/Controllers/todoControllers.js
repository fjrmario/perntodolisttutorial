const pool = require("../config/database");

const createNewTodos = async (req, res) => {
  console.log(req.body);
  const { todo } = req.body;
  try {
    const query = "INSERT INTO todo (todo) VALUES ($1) RETURNING *";
    const values = [todo];
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
  createNewTodos,
};
