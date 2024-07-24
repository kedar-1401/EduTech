const User = require('../models/usermodels');
const bs=require('bcrypt');

const home=(req,res)=>{
    try {
        res.send({msg:'hello home'});
    } catch (error) {
        console.log(error);
    }
}
const reg=async (req,res)=>{
    try {
        //res.send({msg:'hello home'});
        // console.log(req.body);
        const {username,email,password}=req.body;
        // if(password!=confirmPassword){
        //     res.status(400).json({message:"Confirm password is different from password"})
        // }
        
        const userExist= await User.findOne({email});
        
        if(userExist){
            res.status(400).json({message:"You have an account already you can Login instead "})
        }
        // console.log(userExist);
        const userCreated = new User({
            username,
            email,
            password
        });
        await userCreated.save();
        console.log(userCreated);
        res.status(201).json({
            msg: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated.toString(),
        });


    } catch (error) {
        console.error('Error during registration:', error); // Log error details
        res.status(500).json({ message: "Controller server error", error: error.message });
    }
}

const login=async (req,res)=>{
    try {
        
        const {email,password} =req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Invalid Email"});
        }
       
        const validpassword=await bs.compare(password,userExist.password);

        // const truepassword=await userExist.isPasswordValid(password);
        if(validpassword){
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist.toString(),
            });
        }else{
            return res.status(401).json({message:"Invalid Password"});
        }

    } catch (error) {
        console.error('Error during registration:', error); // Log error details
        res.status(500).json({ message: "Controller server error", error: error.message });
    }
}

const user=async(req,res)=>{
    try {
        const userData = req.user;
        // if(userData.email=="kedardhule14@gmail.com"){
        //     userData.isAdmin=true;
        // }
        //  console.log("controleer ",userData);
        return res.status(200).json({  userData });        // res.status(200).json({msg:"in user"})        
    } catch (error) {
        console.log(`Error form user route ${error}`);
    }
}

module.exports={home,reg,login,user}
