const mongoose = require('mongoose');
const env = require("./environment");
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db=mongoose.connection;

db.on("error",console.error.bind(console,"Error connecting to mongodb"));

db.once("open",()=>{
    console.log("Connected to mongodb successfully");
})

module.exports=db;