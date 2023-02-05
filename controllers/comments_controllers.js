const { localsName } = require("ejs");
const Comment=require("../models/comment");
const Post =require("../models/post");

module.exports.createComment=async (req,res)=>{
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                
            post.comments.push(comment);
            post.save();
            req.flash("success","comment is Published!");
            res.redirect("/");
        }
    }catch(err){
        req.flash("error",err);
        res.redirect("/");
    }
    
}

module.exports.destroy=async (req,res)=>{
    try{
        let comment = await Comment.findById(req.query.id);
        if(comment.user == req.user.id){
            let postId=comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{$pull : {comments:req.query.id}});
            req.flash("success","comment is deleted Successfully!");
            return res.redirect("/");
        }else{
            req.flash("error","You can't delete this comment....");
            return res.redirect("/");
        }
    }catch(err){
        req.flash("error",err);
        res.redirect("/");
    }
}

