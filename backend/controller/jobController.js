const Job = require("../model/jobModel")
const User = require("../model/userModel")

const createJob = async (req, res) => {
    const { title, description, location, salary, company } = req.body
    const userId = req.user.id
    if (!title || !description || !location || !salary || !company) {
        return res.status(400).json({ message: "Please provide all data." })

    }

    const job = await Job.create({
        title,
        description,
        location,
        salary,
        company,
        userId
    })

    res.status(201).json({ message: "Job created successfully.", job })

}

const getAllJobs = async (req, res) => {
    const jobs = await Job.findAll({
        include: {
            model: User,
            attributes: ['id','name','email']
        }
    }) //returns array

    if (jobs.length === 0) {
        return res.status(400).json({
            message: "No jobs found."
        })
    }

    res.status(200).json({
        message: "All jobs fetched successfully.",
        data: jobs

    })

}

const getSingleJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findByPk(id)

    if (!job) {
        return res.status(400).json({
            message: "Job Not Found"
        })
    }

    res.status(200).json({
        message: "Job fetched successfully.",
        data: job
    })

}

const updateJob = async (req, res) => {
    const { title, description, location, salary, company } = req.body
    const { id } = req.params

    const job = await Job.findByPk(id)
    if (!job) {
        return res.status(400).json({
            message: "Job not found."
        })
    }

    const [count, updatedJob] = await Job.update({
        title,
        description,
        location,
        salary,
        company
    }, {
        where: { id },
        returning: true      // returning:true allows returning updated data (in postgres only.)
    })

    res.status(200).json({
        message: "Job updated successfullly.",
        data: updatedJob
    })

}


const deleteJob = async (req, res) => {
    const { id } = req.params

    const job = await Job.findByPk(id)

    if (!job) {
        return res.status(400).json({
            message: "Job not found."
        })
    }

    const deleted = await Job.destroy({
        where: {id}
    })

    if(deleted === 0){
        return res.status(400).json({message:"Not authorized or job not found"})
    }

    res.status(200).json({message:"Job deleted successfully."})

}

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob }