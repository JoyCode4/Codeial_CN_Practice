const nodeMailer =require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment},"/comments/new_comment.ejs");
    nodeMailer.transporter.sendMail({
        from:"jaywadhonkar4@yahoo.com",
        to:comment.user.email,
        subject:"New Comment is published",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in Sending mail",err);
            return;
        }

        console.log("Message sent",info);
        return;
    })
}