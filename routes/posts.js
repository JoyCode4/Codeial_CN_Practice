const express=require("express");
const postsController=require("../controllers/posts_controller");
const router=express.Router();
router.get("/posts",postsController.post);
console.log("Post is loaded");
module.exports=router;