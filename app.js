const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');



const app = express();


// Database Connect MongoDB 

// Middleware 
app.use(express.urlencoded({ 
    extended: true,
    useUnifiedTopology: true
}));




app.get('/', (req, res) => {
    res.send("Hello World");
})



app.listen(3000, () => {    
    console.log("server is running on port 3000");
})