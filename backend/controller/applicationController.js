const Application  = require("../model/applicationModel")

const jobApply = async(req,res)=>{
    const {jobId} = req.params
    const userId = req.user.id

    const application = await Application.create({
        userId,
        jobId
    })

    res.status(201).json({
        message: "Job applied successfully!",
        application
    })

}


module.exports = {jobApply}