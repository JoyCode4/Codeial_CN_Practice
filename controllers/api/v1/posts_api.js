const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index=async (req,res)=>{
    let posts=await Post.find({})
    .sort("-createAT")
    .populate("user")
    .populate({
        path : "comments",
        populate:{
            path:"user"
        }
    });

    return res.json(200,{
        message : "It is the V1 api Version of this application",
        posts:posts
    })
}

module.exports.destory=async (req,res)=>{
    try{
        let post=await Post.findById(req.params.id);
        console.log(post);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            return res.json(200,{
                message:"Post {"+ post.content +"} is deleted successfully"
            })
        }else{
            return res.json(401,{
                message:"You cannot delete this post!"
            })
        }
    }catch(err){
        console.log("**********",err);
    return res.json(500,{
        message : "Internal Server Error",
    })
}
}