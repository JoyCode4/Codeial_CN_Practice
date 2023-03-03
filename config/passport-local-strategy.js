const passport=require("passport");
const User=require("../models/user");
const localStratrgy=require("passport-local").Strategy;

// Authentication
passport.use(new localStratrgy({
    usernameField:"email",
    passReqToCallback:true
    },
    function(req,email,password,done){
        // Find the user and establish identity
        User.findOne({email:email},(err,user)=>{
            if(err){
                req.flash("error",err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash("error", "Invalid password/Password");
                return done(null,false); //--->Error = Null and false = user is not fount or user password is wrong
            }
            return done(null,user); //--->Error = Null and user = user is found and user data
        })
    }
));


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


// check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, the pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign_in');
}

passport.setAuthenicatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in the user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;