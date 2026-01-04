const User = require("../model/UserModel");

const registerUser = async (req,res)=>{
    const {name, email, password, role} = req.body;
    const existingUser = await User.findOne({where:{email:email}})

    if(existingUser){
        return res.status(400).json({message:"User already exists with this email."})

    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    res.status(201).json({message:"User registered successfully.", user})

    
}

module.exports = {registerUser}