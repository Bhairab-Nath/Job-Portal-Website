const Application = require("../model/applicationModel")

const jobApply = async (req, res) => {
    const { jobId } = req.params
    const userId = req.user.id

    const application = await Application.create({
        userId,
        jobId
    })

    res.status(200).json({
        message: "Job applied successfully!",
        application
    })

}

const getAllApplications = async (req, res) => {

    const applications = await Application.findAll()

    if (applications.length === 0) {
        return res.status(404).json({
            message: "Applications not found!"
        })
    }

    res.status(200).json({
        message: "Applications fetched successfully!",
        applications
    })
}

const myApplication = async (req, res) => {
    const { id } = req.user
    const applications = await Application.findAll({
        where: {
            userId: id
        }
    })

    if (applications.length === 0) {
        return res.status(404).json({
            message: "Applications not found!"
        })
    }

    res.status(200).json({
        message: "Applications fetched successfully!",
        applications
    })

}

const updateApplicationStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    const application = await Application.findByPk(id)

    if (!application) {
        return res.status(404).json({
            message: "Application not found!"
        })
    }

    const [count, updatedApplication] = await Application.update({
        status
    }, {
        where: {
            id: id
        },
        returning: true
    })

    res.status(200).json({
        message: "Application Status updated successfully!",
        updatedApplication
    })

}


const deleteApplication = async (req, res) => {
    const { id } = req.params
    const application = await Application.findByPk(id)

    if (!application) {
        return res.status(404).json({
            message: "Application not found!"
        })
    }
    
    await Application.destroy({
        where: {
            id: id
        }
    })

    res.status(200).json({
        message:"Application deleted successfully!"
    })

}




module.exports = { jobApply, getAllApplications, myApplication, updateApplicationStatus, deleteApplication }