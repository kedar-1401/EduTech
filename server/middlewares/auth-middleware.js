const jwt=require ("jsonwebtoken")
const usermodel=require('../models/usermodels')
const authmiddleware=async (req,res,next)=>{
   
    const token=req.header("Authorization");
    if(!token){
        return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided" });
    }
    const jwtToken=token.replace("Bearer","").trim();
    // res.send({token:jwt.verify(token,"secretkey")});
    // console.log(jwtToken);
    try {
        
       const isVerify=jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        // console.log("is verify",isVerify);
        // if(isVerify.email=="kedardhule14@gmail.com"){
        //     isVerify.admin=true;
        // }
        // console.log("is verify",isVerify);

        const userdata=await usermodel.findOne({email:isVerify.email}).
        select({
            password:0,
        });
        // if(!userdata){

        // }
        req.user=userdata;
        req.token=token;
        req.userID=userdata._id;
        // res.status(200).json(userdata)
        next()
    } catch (error) {
        console.log("error from authmiddleware",error);
    }

   
}

module.exports=authmiddleware

