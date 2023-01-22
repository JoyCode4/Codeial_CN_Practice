const User = require('../models/user');

module.exports.profile=function(req,res){
    return res.render("profile",{
        title:"Profile"
    })
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
    // TODO Later
}