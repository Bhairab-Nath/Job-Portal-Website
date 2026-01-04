const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter:false, force:false});
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {sequelize, connectDB};