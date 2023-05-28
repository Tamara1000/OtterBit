const { decodeToken } = require("../utils/jwt");
const { pool } = require("../db");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("token:" ,token);
    if (!token) {
      return res.sendStatus(401);
    }
    token = token.split(" ")[1];
    const payload = decodeToken(token);
    console.log({payload});
    res.locals.user = payload;
   next();
  } catch (error) {
    res.sendStatus(401);
  }
  // res.send("Testing the token")
};

module.exports = { auth };
