const mongoose=require('mongoose')

const ServiceSchema=new mongoose.Schema({
    service:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('service',ServiceSchema)