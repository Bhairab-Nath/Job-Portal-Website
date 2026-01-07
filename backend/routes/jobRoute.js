const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require("../controller/jobController")
const authMiddleware = require("../middlewares/authMiddleware")
const router = require("express").Router()

// router.post("/createJob",authMiddleware,createJob)
// router.get("/getAllJobs",getAllJobs)

router.route("").get(getAllJobs).post(authMiddleware,createJob)
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router
