const express = require("express");
const { register, getUsers, logIn } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", logIn);
router.post("/register", register);


module.exports = router;
