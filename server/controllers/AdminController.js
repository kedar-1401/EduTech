const users=require('../models/usermodels');
const contacts=require("../models/Contactmodel");
const services=require("../models/ServiceModel")
const getUserData=async(req,res)=>{
    try {
        const deletedata=await req.body;
        // console.log('deletedata ' + deletedata);
        const userdata=await users.find({},{password:0});

        if(!userdata || userdata.length === 0){
            res.status(404).json({message:"No User Found"})
        }
        // console.log(userdata);
        return res.status(300).json({userdata})
    } catch (error) {
        console.log({msg:"Error from admin controller"});
    }
}
const getContactData=async(req,res)=>{
    try {
        const contactdata=await contacts.find();

        if(!contactdata || contactdata.length === 0){
            res.status(404).json({message:"No Contacts Found"})
        }

        return res.status(200).json({contactdata})
    } catch (error) {
        console.log({msg:"Error from admin controller"});
    }
}
const deleteuser=async(req,res)=>{
    try {
        const id=req.params.id;

        await users.deleteOne({_id : id})
        
        return res.status(200).json({message:'Deleted Successfully'})
    } catch (error) {
        next(error);
    }
}
const deletecontact=async(req,res)=>{
    try {
        const id=req.params.id;

        await contacts.deleteOne({_id : id})
        
        return res.status(200).json({message:'Deleted Successfully'})
    } catch (error) {
        next(error);
    }
}
const getuser=async(req,res)=>{
    try {
        const id=req.params.id;
        
        const data=await  users.findById({_id:id});

        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
const updateuser=async(req,res)=> {
    try {
        const id=req.params.id;
        const updateuseredata=req.body;


        const updatedata=await users.updateOne(
            {_id:id},
            {$set:updateuseredata}
        )

        return res.status(200).json(updatedata);

    } catch (error) {
        next(error);
    }
}

const getservicedata=async(req,res)=>{
    try {
        const serviceData=await services.find({});

        if(!serviceData || serviceData.length === 0){
            res.status(404).json({message:"No Services Found"})
        }

        return res.status(300).json({serviceData})
    } catch (error) {
        console.log({msg:"Error from admin controller"});
    }
}
const getservice=async(req,res)=>{
    try {
        const id=req.params.id;

        const service=  await services.findById({_id:id});

        return res.status(200).json(service);
    } catch (error) {
        next(error);
    }
}
const deleteservices=async(req,res)=>{
    try {
        const id=req.params.id;

        await services.deleteOne({_id : id})
        
        return res.status(200).json({message:'Service Deleted Successfully'})
    } catch (error) {
        next(error);
    }
}
const updateservice=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateservicedata=req.body;

        // console.log(updateservicedata);
        const updatedata=await services.updateOne(
            {_id:id},
            {$set:updateservicedata}
        )

        return res.status(200).json(updatedata);

    } catch (error) {
        next(error);
    }
}

const addService=async(req,res)=>{
    try {
        const {service,description,price,provider,image}=req.body;
        const imageExist=await services.findOne({image})
        if(imageExist){
            res.status(400).json({message:"Image Already Exist ,Add Different Image For better experience"});
        }

        await services.create({
            service,description,price,provider,image
        })

        res.status(201).json({
            message:"Service Added Succefully"
        })
    } catch (error) {
        res.status(500).json("Admin Control server error");
    }
}
module.exports={getUserData,getContactData,deleteuser,getuser,updateuser,deletecontact,getservicedata,deleteservices,  getservice,updateservice,addService}