const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/home",(req,res)=>{
    res.send("This is home page.");
})

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");  
})
