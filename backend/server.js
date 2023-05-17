const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./db");

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(connectDb());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
