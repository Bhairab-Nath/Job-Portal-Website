const { registerUser, loginUser } = require("../controller/userController");
const catchError = require("../services/catchError");
const router = require("express").Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.route("/register").post(catchError(registerUser))
router.route("/login").post(catchError(loginUser))

module.exports = router;