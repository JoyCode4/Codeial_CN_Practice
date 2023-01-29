const express=require("express");
const postsController=require("../controllers/posts_controller");
const passport=require("passport");
const router=express.Router();

router.post("/posts-create",passport.checkAuthentication,postsController.createPost);
module.exports=router;