const Application = require("./applicationModel");
const Job = require("./jobModel");
const User = require("./userModel")

// Relationships between User and Job
User.hasMany(Job, { foreignKey: 'userId'});
Job.belongsTo(User, { foreignKey: 'userId'});

// Relationships between User and Application
User.hasMany(Application, {foreignKey: "userId"})
Application.belongsTo(User, {foreignKey: "userId"})

// Relationships between Job and Application
Job.hasMany(Application, {foreignKey: "jobId"})
Application.belongsTo(Job, {foreignKey: "jobId"})

module.exports = { User, Job, Application };