const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log("Connected to Postgres database");

    const res = await pool.query(`SELECT * FROM todo`);
    console.log(res);
    await pool.end();
  } catch (error) {
    console.log("Error connecting to Postres database", error);
  }
};

module.exports = connectDb;
