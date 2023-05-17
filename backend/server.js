const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log(dotenv.config());
require("./config/database");

const PORT = 3000;
const todosRouter = require("./Routes/todoRoutes");

app.use(cors());
app.use(express.json());

app.use("api/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
