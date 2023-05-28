const { generateToken } = require("../utils/jwt");
const { pool } = require("../db");

const register = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  console.log(user_name);
  console.log(user_email);
  console.log(user_password);

  try {
    // Check if song is already in user's favorites
    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_name = $1 AND user_email = $2",
      [user_name, user_email]
    );

    if (userResult.rows.length === 0) {
      // Add song to user's favorites
      await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
        [user_name, user_email, user_password]
      );
      return res.send(`user  ${user_name} added to users`);
    }
    pool.end();
    return res.send(`user ${user_name} is already exists`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const logIn = async (req, res) => {
  try {
    const client = await pool.connect();
    const { email, user_password } = req.body;
    if (!email || !user_password) {
      return res.status(401).send("Please enter");
    }
    // Check if song is already in user's favorites
    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_name = $1 AND user_email = $2",
      [user_name, user_email]
    );
    pool.end();

    if (!userResult.rows.length === 0) {
      const token = generateToken(userResult.rows);
      console.log(token);
      console.log(userResult.rows);
      return res.status(200).send({ token, userResult });
    }
    return res.status(401).send("User not exists");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Bad Request Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const userResult = await pool.query("SELECT * FROM users ");
    const allUsers = userResult.rows;
    res.status(200).send(allUsers);
    pool.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send("Bad Request Error");
  }
};

module.exports = { register, getUsers, logIn };
