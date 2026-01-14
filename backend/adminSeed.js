const User = require("./model/userModel")
const bcrypt = require("bcryptjs")

const seedAdmin = async () => {

    try {

        const adminExists = await User.findOne({
            where: {
                role: 'jobprovider'
            }
        })

        if (adminExists) {
            return console.log('Admin already exists')
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

        await User.create({
            name: 'admin',
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "jobprovider"
        })

        console.log("Admin seeded successfully!")

    } catch(err){
        console.log("Error seeding admin:", err)
    }


}

module.exports = seedAdmin;