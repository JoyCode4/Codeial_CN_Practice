const express=require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controllers");

router.post("/create-comments",passport.checkAuthentication,commentsController.createComment);
// router.get("/destroy",passport.checkAuthentication,commentsController.destroy);
router.get("/destroy",passport.checkAuthentication,commentsController.destroy);
module.exports=router;