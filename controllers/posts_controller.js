const Post=require("../models/post");
const Comment=require("../models/comment");


module.exports.post=function(req,res){
    return res.render("posts",{
        title:"Posts"
    })
}

module.exports.createPost=(req,res)=>{
    Post.create({
        content:req.body.content,
        user:req.user._id
    },(err,post)=>{
        if(err){
            console.log("Error in creating a post, Error : "+err);
        }

        return res.redirect("back");
    })
}


