const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require("../controller/jobController")
const authenticate = require("../middlewares/authMiddleware")
const jobOwnerAuthorized = require("../middlewares/jobOwnerMiddleware")
const roleAuthorised = require("../middlewares/roleMiddleware")
const router = require("express").Router()

// router.post("/createJob",authMiddleware,createJob)
// router.get("/getAllJobs",getAllJobs)

router.route("/").get(getAllJobs).post(authenticate, roleAuthorised("jobprovider"), createJob)
router.route("/:id").get(getSingleJob).patch(authenticate, jobOwnerAuthorized, updateJob).delete(authenticate, jobOwnerAuthorized, deleteJob)

module.exports = router
