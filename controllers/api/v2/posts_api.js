module.exports.index = (req,res)=>{
    res.json(200,{
        message:"This the api of v2 of the posts",
        posts:[]
    })
}