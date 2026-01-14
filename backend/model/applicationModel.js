const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/dbConfig');

const Application = sequelize.define(
    'Application',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        status: {
            type: DataTypes.ENUM("applied", "in_review", "rejected", "accepted"),
            allowNull: false,
            defaultValue: "applied"
        },
        appliedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }
)

module.exports = Application