const contactCollection=require('../models/Contactmodel')
const serviceCollection=require('../models/ServiceModel')
const nodemailer = require("nodemailer");
const Contact=async(req,res)=>{
    try {
        const {username,email,subject,message}=req.body;
        let testAccount = await nodemailer.createTestAccount();

        // connect with the smtp
        let transporter = await nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: 'mireille.kirlin@ethereal.email',
            pass: 'P2X64jJ76pZ7gQAkjU'
          },
        });
      
        let info = await transporter.sendMail({
            from: `${username} <mireille.kirlin@ethereal.email>`, // sender address          
            to: "kedardhule14@gmail.com", // list of receivers
            subject: subject ,// Subject line
            text: message, // plain text body
        });
      
        console.log("Message sent: %s", info.messageId);

        await contactCollection.create({
            username,
            email,
            subject,
            message
        })

        res.status(200).json({
            status:'success',
        })
    } catch (error) {
        console.log(error);
    }
}

const services=async(req,res)=>{
    try {
        
        const data = await serviceCollection.find();

        if(!data){
            res.status(400).json({msg:"No data in database"});
        }

        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
    }
}
module.exports={Contact,services}