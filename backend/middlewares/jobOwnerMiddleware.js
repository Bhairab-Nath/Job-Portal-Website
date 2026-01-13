const Job = require("../model/jobModel")

const jobOwnerAuthorized = async(req,res,next)=>{
    const {id} = req.params
    const job = await Job.findByPk(id)

    if(!job){
        return res.status(404).json({message:"Job not Found!"})
    }

    if( req.user.id !== job.userId && req.user.role !== "admin" ){
        return res.status(403).json({message:"Forbidden!"})
    }

    next()
   
}

module.exports = jobOwnerAuthorized