const { registerUser, loginUser } = require("../controller/userController");
const router = require("express").Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

module.exports = router;