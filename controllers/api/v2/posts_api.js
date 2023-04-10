module.exports.index = (req,res)=>{
    return res.json(200,{
        message : "It is the V2 api version of this application",
        posts:[]
    })
}