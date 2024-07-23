const collection=require('../models/usermodels')
const bcrypt=require('bcrypt')
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
        const {username,email,password,confirmPassword}=req.body;
        if(password!=confirmPassword){
            res.status(400).json({message:"Confirm password is different from password"})
        }
        
        const userExist= await collection.findOne({email});

        if(userExist){
            res.status(400).json({message:"You have an account already you can Login instead "})
        }
        
        const userCreated= await collection.create({
            username,
            email,
            password,
        })
        
        res.status(201).json({
            msg: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated.toString(),
        });


    } catch (error) {
        res.status(500).json("controller server error");
    }
}

const login=async (req,res)=>{
    try {
        
        const {email,password} =req.body;
        const userExist=await collection.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Invalid Email"});
        }
       
        // const validPass=await bcrypt.compare(password,userExist.password);

        const validPass=await userExist.isPasswordValid(password);
        if(validPass){
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist.toString(),
            });
        }else{
            return res.status(401).json({message:"Invalid Password"});
        }

    } catch (error) {
        res.status(500).json("Internal server error");
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
