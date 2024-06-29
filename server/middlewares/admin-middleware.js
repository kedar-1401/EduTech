const adminmiddleware=async (req,res,next)=>{

    try {
        const admin=req.user.isAdmin;
        // console.log(admin);
        
        if(admin===false){
            return res.status(403).json({message:false});
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports=adminmiddleware