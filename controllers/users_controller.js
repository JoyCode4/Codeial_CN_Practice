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
    // TODO Later
}

module.exports.createSession=function(req,res){
    // TODO Later
}