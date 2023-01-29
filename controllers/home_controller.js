const Post=require("../models/post");

module.exports.home=function(request,response){
    // console.log(request.cookies);
    // response.cookie("user_id",Math.floor(Math.random()*10));
    /*
    Post.find({},(err,posts)=>{
        if(err){
            console.log("Error in Showing on Home page the posts");
        }
        return response.render("home",{
            title:"Home",
            posts:posts
        })
    })
    */

    Post.find({}).populate("user").exec((err,posts)=>{
        if(err){
            console.log("Error in Showing on Home page the posts");
        }
        return response.render("home",{
            title:"Home",
            posts:posts
        }) 
    })
    
    
}

// module.exports.actionName=function(request,response){}