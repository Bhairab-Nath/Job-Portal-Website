const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");

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

}


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Forgot password request for email:", email)

    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        console.log("OTP generated:", otp)

        
        user.otp = otp
        await user.save()

        await sendEmail({
            email,
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${otp}`,
        })

        return res.status(200).json({
            message: "OTP sent to email",
        })
    } catch (err) {
        console.error("Failed to process forgot password:", err.message)
        return res.status(500).json({ message: "Failed to send OTP" })
    }
}


// verify otp 
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    if (!email || !otp) {
        return res.status(400).json({
            message: "Please provide email,otp"
        })
    }

    // check if that otp is correct or not of that email
    const userExists = await User.findOne({ where: { email: email } });
    console.log(userExists)
    if (!userExists) {
        return res.status(404).json({
            message: "Email is not registered"
        })
    }

    
    console.log(userExists.otp, otp)
    if (userExists.otp !== otp) {

        res.status(400).json({
            message: "Invalid otp"
        })
    } else {
        // dispose the otp so cannot be used next time the same otp
        userExists.otp = null
        userExists.isOtpVerified = true
        await userExists.save()
        res.status(200).json({
            message: "Otp is correct"
        })
    }
}


const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "Please provide email,newPassword,confirmPassword"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "newPassword and confirmPassword doesn't match"
        })
    }

    const userExists = await User.findOne({ where: { email: email } })
    if (!userExists) {
        return res.status(404).json({
            message: "User email not registered"
        })
    }

    console.log(userExists)
    if (userExists.isOtpVerified != true) {
        return res.status(403).json({
            message: "You cannot perform this action"
        })
    }

    userExists.password = await bcrypt.hash(newPassword, 10)
    userExists.isOtpVerified = false

    await userExists.save()

    res.status(200).json({
        message: "Password changed successfully"
    })
}

module.exports = { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword }