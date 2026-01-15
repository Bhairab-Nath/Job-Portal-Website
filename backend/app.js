require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/dbConfig');
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
const applicationRoute = require('./routes/applicationRoute');
const seedAdmin = require('./adminSeed.js');
require("./model/index.js");  

const app = express();

app.use(express.json()) //frontend ko data backend lai bujhauna yo use garne

connectDB();
seedAdmin();

app.use("/api/user", userRoute)
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");  
})
