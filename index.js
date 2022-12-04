const express=require("express");
const app=express();
const port=8000;

// Use express router
app.use("/",require("./routes/index"));

// Set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server : ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
})