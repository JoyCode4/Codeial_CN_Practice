const User = require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id,(err,user)=>{
        return res.render("profile",{
            title:"User Profile",
            profile_user:user
        });
    })
}

module.exports.update=(req,res)=>{
    if(req.user.id == req.query.id){
        User.findByIdAndUpdate(req.query.id,req.body,(err,user)=>{
            return res.redirect("/");
        })
    }else{
        return res.status(401).send("Unauthorized");
    }
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("sign_in",{
        title:"Sign In"
    })
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
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
            console.log("Error in Credentials");
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
    return res.redirect("/");
}

module.exports.destroySession = function(req,res){
    // code is different from sir(callback function of req.logout)
    req.logout((err)=>{
        console.log("destroySession there is error");
    });
    return res.redirect("/");
}