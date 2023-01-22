const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0/codeial_development");

const db=mongoose.connection;

db.on("error",console.error.bind(console,"Error connecting to mongodb"));

db.once("open",()=>{
    console.log("Connected to mongodb successfully");
})

module.exports=db;