const { jobApply, updateApplicationStatus, deleteApplication, getAllApplications, myApplication } = require("../controller/applicationController");
const authenticate = require("../middlewares/authMiddleware");
const roleAuthorised = require("../middlewares/roleMiddleware");
const catchError = require("../services/catchError");
const router = require("express").Router();

router.route("/apply/:jobId").post(authenticate, roleAuthorised("jobseeker"), catchError(jobApply))

router.route("/").get(authenticate,roleAuthorised("jobprovider"),catchError(getAllApplications))

router.route("/myapplications").get(authenticate,roleAuthorised("jobseeker"),catchError(myApplication))

router.route("/:id").patch(authenticate,roleAuthorised("jobprovider"),catchError(updateApplicationStatus)).delete(authenticate,roleAuthorised("jobprovider"),catchError(deleteApplication))


module.exports = router;