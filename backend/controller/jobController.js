const Job = require("../model/jobModel")

const createJob = async (req,res)=>{
    const {title, description, location, salary, company} = req.body
    const userId = req.user.id
    if(!title || !description || !location || !salary || !company){
        return res.status(400).json({message: "Please provide all data."})

    }

    const job = await Job.create({
        title,
        description,
        location, 
        salary,
        company,
        userId
    })

    res.status(201).json({message:"Job created successfully.",job})

}


module.exports = {createJob}