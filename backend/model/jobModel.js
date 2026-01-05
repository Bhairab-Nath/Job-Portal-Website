const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/dbConfig');

const Job = sequelize.define(
    'Job',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        }

    },{
    timestamps: true
}
)

module.exports = Job;