const express=require("express");
const router=express.Router();
const passport=require("passport");

const usersController=require("../controllers/users_controller");
// const postsController=require("../controllers/posts_controller");
console.log("Router is loaded");

router.get("/profile",passport.checkAuthentication,usersController.profile);
router.post("/update",passport.checkAuthentication,usersController.update);
router.get("/sign_in",usersController.signIn);
router.get("/sign_up",usersController.signUp);
router.post("/create",usersController.create);
// router.get("/post",postsController.post);
router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect:"/users/sign_in"}
    ),usersController.createSession);

router.get("/sign_out",usersController.destroySession);

router.get("/auth/google",passport.authenticate("google",{scope: ["profile","email"]}));
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"users/sign_in"}), usersController.createSession);

module.exports=router;