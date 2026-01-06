const { createJob } = require("../controller/jobController")
const authMiddleware = require("../middlewares/authMiddleware")
const Router = require("express").Router()

Router.post("/createJob",authMiddleware,createJob)

module.exports = Router
