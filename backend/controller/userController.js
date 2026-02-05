const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please fill all the fields." })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." })
    }
    
    const existingUser = await User.findOne({ where: { email: email } })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email." })

    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            
        }
    
    })


}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." })
    }

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
        return res.status(400).json({ message: "No user with that email." })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password." })
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })

    






    // res.status(200).json({ message: "User logged in sucessfully." })

}

module.exports = { registerUser, loginUser }