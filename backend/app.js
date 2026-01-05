require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/dbConfig');
const userRoute = require('./routes/userRoute');
require("./model/index.js");  

const app = express();

app.use(express.json()) //frontend ko data backend lai bujhauna yo use garne

connectDB();

app.use("/api/auth", userRoute)


app.listen(4000, ()=>{
    console.log("Server is running on port 4000");  
})
