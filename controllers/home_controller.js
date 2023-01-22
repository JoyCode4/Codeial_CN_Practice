module.exports.home=function(request,response){
    console.log(request.cookies);
    // response.cookie("user_id",Math.floor(Math.random()*10));
    return response.render("home",{
        title:"Home"
    })
}

// module.exports.actionName=function(request,response){}