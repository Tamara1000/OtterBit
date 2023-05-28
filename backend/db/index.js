const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const connectToDB = () => {
  pool
    .connect()
    .then(() => {
      console.log("Connected to postgreSQL db");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};

module.exports = { pool, connectToDB };
