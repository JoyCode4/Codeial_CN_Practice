const User = require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(user){
                return res.render('profile',{
                    title:"Profile",
                    user: user
                })
            }else{
                return res.redirect("/users/sign_in");
            }
        })
    }else{
        return res.redirect("/users/sign_in");
    }
}

module.exports.signIn=function(req,res){
    return res.render("sign_in",{
        title:"Sign In"
    })
}

module.exports.signUp=function(req,res){
    return res.render("sign_up",{
        title:"Sign Up"
    })
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect("back");
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error in Credentials while signing");
            return ;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log("Error in Signing Up");
                    return ;
                }
                return res.redirect("/users/sign_in");
            })
        }else{
            return res.redirect("back");
        }
    })
}

module.exports.createSession=function(req,res){
    // steps of authentication
    // find the user
    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.log("Error in Credentials");
            return ;
        }
        // handle user found
        if(user){
            // handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect("back");
            }
            // handle session creation
            res.cookie("user_id",user.id);
            return res.redirect("/users/profile/");
        }else{
            
            // handle user not found
            return res.redirect("/");
        }
    })






}