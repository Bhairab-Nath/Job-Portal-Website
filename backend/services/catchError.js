
const catchError = (fn)=>{
   return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            res.status(500).json({
                message: "An error has occured!",
                error: err.message

            })
        })
   }
}

module.exports = catchError