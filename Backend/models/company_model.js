import mongoose from "mongoose";

const companySchema = new mongoose.Schema9({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    location:{
        type: String,
    },
    logo:{
        type: String, //url
    },
    userId:{
        type: String,
        ref:'User',
        required: true
    }
},{timestamps:true})

export const Company = mongoose.model('Company',companySchema);