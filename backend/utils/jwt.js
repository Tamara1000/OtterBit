const jwt = require("jsonwebtoken");

// accept the payload
// returns a token
const generateToken = (payload) => {
  const token = jwt.sign({ payload: payload }, "123123", { expiresIn: "1h" });
  return token;
};

// accept the token
// return the payload
const decodeToken = (token) => {
  const result = jwt.decode(token);
  return result.payload;
};

module.exports = { generateToken, decodeToken };
