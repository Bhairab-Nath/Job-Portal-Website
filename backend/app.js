require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/dbConfig');
const app = express();

app.use(express.json()) //frontend ko data backend lai bujhauna yo use garne

connectDB();

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/home",(req,res)=>{
    res.send("This is home page.");
})

app.get("/about",(req,res)=>{
    res.send("This is about page.");
})

app.post("/hello", (req,res)=>{
    console.log(req.body)
    res.send("Post request done.")
})




app.listen(4000, ()=>{
    console.log("Server is running on port 4000");  
})
