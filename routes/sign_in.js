const express=require("express");
const router=express.Router();
const signInController=require("../controllers/sign_in_controller");
// const postsController=require("../controllers/posts_controller");
console.log("Sign In is loaded");

router.get("/signIn",signInController.signIn);
// router.get("/post",postsController.post);

module.exports=router;