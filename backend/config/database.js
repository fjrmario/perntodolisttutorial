const { Pool } = require("pg");

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(credentials);

pool.connect((error, client, release) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    return;
  }

  console.log("Connected to PostgreSQL.");

  // Perform a test query
  client.query("SELECT NOW()", (queryError, result) => {
    release(); // Release the client back to the pool

    if (queryError) {
      console.error("Error executing query:", queryError.message);
      return;
    }

    console.log("PostgreSQL query result:", result.rows);
  });
});

module.exports = pool;
