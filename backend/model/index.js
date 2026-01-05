const Job = require("./jobModel");
const User = require("./UserModel");

User.hasMany(Job, { foreignKey: 'userId'});
Job.belongsTo(User, { foreignKey: 'userId'});

module.exports = { User, Job };