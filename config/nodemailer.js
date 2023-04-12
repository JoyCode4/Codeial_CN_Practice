const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
    service : "outlook",
    host : "smtp.outlook.com",
    port:587,
    secure:false,
    auth:{
        user:"jaywadhonkar@outlook.com",
        pass:"joy00004"
    }
});


let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers", relativePath),
        data,
        (err,template)=>{
            if(err){console.log("Error in rendering Template"); return;}

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}