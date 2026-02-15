const router = require("express").Router()
const { initiatePayment, paymentStatus } = require("../controller/paymentController");

router.route("/initiate-payment").post(initiatePayment)
router.route("/payment-status").post(paymentStatus)


module.exports = router