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

module.exports.destroy=(req,res)=>{
    Post.findById(req.query.id,(err,post)=>{
        if(err){
            console.log("Error is here : "
            +err);
            return;
        }
        console.log(req.user.id);
        console.log(req.query.id);
        console.log(post);
        // .id means converting the object id into string
        
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.query.id});
            return res.redirect("/");
        }
        else{
            return res.redirect("/");
        }
    })
}

