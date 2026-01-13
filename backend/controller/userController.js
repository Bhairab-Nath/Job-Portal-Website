const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email: email } })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email." })

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    res.status(201).json({ message: "User registered successfully.", user })


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
        token
    })

    






    // res.status(200).json({ message: "User logged in sucessfully." })

}

module.exports = { registerUser, loginUser }