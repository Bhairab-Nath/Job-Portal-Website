const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require("../controller/jobController")
const authenticate = require("../middlewares/authMiddleware")
const roleAuthorised = require("../middlewares/roleMiddleware")
const catchError = require("../services/catchError")
const router = require("express").Router()

// router.post("/createJob",authMiddleware,createJob)
// router.get("/getAllJobs",getAllJobs)

router.route("/").get(catchError(getAllJobs)).post(authenticate, roleAuthorised("jobprovider"), catchError(createJob))

router.route("/:id").get(catchError(getSingleJob)).patch(authenticate, roleAuthorised("jobprovider"), catchError(updateJob)).delete(authenticate,roleAuthorised("jobprovider"), catchError(deleteJob))

module.exports = router
