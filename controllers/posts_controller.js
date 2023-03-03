const Post=require("../models/post");
const Comment=require("../models/comment");


module.exports.post=function(req,res){
    return res.render("posts",{
        title:"Posts"
    })
}
/*
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
*/

module.exports.createPost = async (req,res)=>{
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        req.flash("success","Post Published!")
        return res.redirect("back");
    }catch(err){
        req.flash("error",err);
        return res.redirect("back");
    }
    
}

module.exports.destroy=async (req,res)=>{
    try{
        let post = await Post.findById(req.query.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.query.id});
            req.flash("success", "Post and associated comments deleted successfully!");
            return res.redirect("/");
        }
        else{
            req.flash("error","You can't delete this post ..")
            return res.redirect("/");
        }
    }catch(err){
        req.flash("error", err);
        return res.redirect("/");
    }
    
}

