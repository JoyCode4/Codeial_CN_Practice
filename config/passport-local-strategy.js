const passport=require("passport");
const User=require("../models/user");
const localStratrgy=require("passport-local").Strategy;

// Authentication
passport.use(new localStratrgy({
    usernameField:"email"
},
function(email,password,done){
    // Find the user and establish identity
    User.findOne({email:email},(err,user)=>{
        if(err){
            console.log("Error in Finding User --> Passport");
            return done(err);
        }
        if(!user || user.password != password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        return done(null,user);
    })
}));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Errorin Finding User --> Passport");
            return done(err);
        }
        return done(null,user);
    })
})

module.exports=passport;