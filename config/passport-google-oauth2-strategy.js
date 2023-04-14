const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto= require("crypto");
const env = require("./environment");

const User = require("../models/user");
const { create } = require("connect-mongo");

// tell passport to use strategy for google login
passport.use(new googleStrategy({
        clientID : env.google_client_id,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_call_back_url
    },

    function(accessToken, refreshToken, profile, done){
        // find  USER
        User.findOne({email: profile.emails[0].value}).exec((err,user)=>{
            if(err){console.log("Error in google Strategy : "+err); return;}

            console.log(profile);

            if(user){
                // if found, set this user as req.user
                return done(null,user);
            }
            else{
                // if not found, create the user and set it as
                User.create({
                    name : profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                },(err,user)=>{
                    if(err){console.log("Error in creating user : "+err); return;}

                    return done(null,user);
                })
            }
        })
    }
))

module.export = passport;