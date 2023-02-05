const Post=require("../models/post");
const User=require("../models/user");

/*
module.exports.home=function(request,response){
    
    // console.log(request.cookies);
    // response.cookie("user_id",Math.floor(Math.random()*10));
    Post.find({},(err,posts)=>{
        if(err){
            console.log("Error in Showing on Home page the posts");
        }
        return response.render("home",{
            title:"Home",
            posts:posts
        })
    })
    

    Post.find({})
    .populate("user")
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec((err,posts)=>{
        if(err){
            console.log("Error in Showing on Home page the posts");
        }
        User.find({},(err,users)=>{
            return response.render("home",{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
            }) 
        })
    })
    
    
}
*/
// Convert above home function to async and await conversion
module.exports.home = async (req,res)=>{

    try{
        let posts = await Post.find({})
        .populate("user")
        .populate({
            path:"comments",
            populate:{
                path:"user"
            }
        });

        let users=await User.find({});

        return res.render("home",{
            title:"Codeial | Home ",
            posts:posts,
            all_users:users
        })

    }catch(err){
        console.log("Error : "+err);
    }

}