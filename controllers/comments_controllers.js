const { localsName } = require("ejs");
const Comment=require("../models/comment");
const Post =require("../models/post");

module.exports.createComment=(req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){
            console.log("Error in Finding post in creating Comments Error : "+err);
            return;
        }
        else{
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },function(err,comment){
                    // handle err
                    if(err){
                        console.log("Error creating comments, Error : "+err);
                        return;
                    }
                    post.comments.push(comment);
                    post.save();

                    res.redirect("/");
                })
            }
        }
    });

}
