const { jobApply } = require("../controller/applicationController");
const authenticate = require("../middlewares/authMiddleware");
const roleAuthorised = require("../middlewares/roleMiddleware");
const catchError = require("../services/catchError");
const router = require("express").Router();

router.route("/:jobId").post(authenticate, roleAuthorised("jobseeker"), catchError(jobApply))

module.exports = router;