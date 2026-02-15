const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require("../controller/userController")
const catchError = require("../services/catchError")
const router = require("express").Router()

// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.route("/register").post(catchError(registerUser))
router.route("/login").post(catchError(loginUser))

router.route("/forget-password").post(catchError(forgotPassword))
router.route("/verify-otp").post(catchError(verifyOtp))
router.route("/reset-password").post(catchError(resetPassword))


module.exports = router