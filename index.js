const cookieParser = require("cookie-parser");
const express=require("express");
const app=express();
const port=8000;
const expressLayouts = require("express-ejs-layouts");
const db=require("./config/mongoose");
const session =require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

// Use for css and js links extraction into the layouts
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)



// Set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

app.use(session({
    name:"Codeial",
    // Todo change thesecret before depolyment inproduction
    secret:"jayesh",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Use express router
app.use("/",require("./routes/index"));
app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server : ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
})