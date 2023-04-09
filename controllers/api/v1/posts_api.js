const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
    // return res.json(200,{
    //     message:"List of posts",
    //     posts:posts
    // })
}

module.exports.destroy=async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            // req.flash("success", "Post and associated comments deleted successfully!");
            // return res.redirect("/");
            return res.json(200,{
                message:"Post and associated comments deleted successfully!"
            })
        // }
        // else{
        //     req.flash("error","You can't delete this post ..")
        //     return res.redirect("/");
        // }
    }catch(err){
        console.log(err);
        // req.flash("error", err);
        // return res.redirect("/");
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
    
}