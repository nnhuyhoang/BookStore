const nodemailer =require("nodemailer")
const hogan=require("hogan.js")
const fs=require("fs")
const path=require("path")
const keys=require("./../../config/index")

const template=fs.readFileSync("./services/email/messageForm.hjs","utf-8")
const compiledTemplate=hogan.compile(template)

module.exports.sendRegisterEmail=(token,user)=>{
    const transport={
        host: "smtp.gmail.com",
        port:  587,
        secure: false,
        requireTSL: true,
        requireSSL: true,
        auth:{
            user: keys.email,
            pass: keys.password
        }
    }
    const transporter=nodemailer.createTransport(transport)
    const mailOptions={
        from: "hoangnguyen921997@gmail.com",
        to: user.email,
        subject: "VERIFICATION EMAIL",
        html: compiledTemplate.render({
            name:user.name,
            email: user.email,
            token: token.token

        })
    }
    transporter.sendMail(mailOptions,err=>{
        if(err) console.log(err);
        else{
            console.log("Success");
            
        }
        
    })
}

