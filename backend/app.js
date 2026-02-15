require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/dbConfig');
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
const applicationRoute = require('./routes/applicationRoute');
const paymentRoute = require('./routes/paymentRoute');
const seedAdmin = require('./adminSeed.js');
require("./model/index.js");
const cors = require('cors');
const app = express();

app.use(express.json()) //frontend ko data backend lai bujhauna yo use garne

connectDB();
seedAdmin();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

app.use("/api/user", userRoute)
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)
app.use("/api/payment", paymentRoute)

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})