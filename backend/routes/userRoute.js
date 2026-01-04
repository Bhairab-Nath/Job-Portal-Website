const { registerUser } = require("../controller/userController");
const Router = require("express").Router();

Router.post("/register", registerUser);

module.exports = Router;