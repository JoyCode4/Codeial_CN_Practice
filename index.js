const cookieParser = require("cookie-parser");
const express=require("express");
const app=express();
const port=8000;
const expressLayouts = require("express-ejs-layouts");
const db=require("./config/mongoose");

// used for session Cookie
const session =require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore =require('connect-mongo');
// const sassMiddleware=require('node-sass-middleware');
const flash = require("connect-flash");
const customMiddleware=require("./config/middleware");
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
// mongo store is used to store the session cookie in the db
app.use(session({
    name:"Codeial",
    // Todo change the secret before depolyment in production mode
    secret:"jayesh",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) //it is of the 100 minutes
    },
    // This code is different from sir
    store:MongoStore.create({
        mongoUrl:'mongodb://0.0.0.0/codeial_development',
        autoRemove:'disabled'
    },
    function(err){
        console.log("Error od mongodb authentication : "+err || "connect-mongodb setup ok of authentication");
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenicatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// Use express router
app.use("/",require("./routes/index"));
app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server : ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
})