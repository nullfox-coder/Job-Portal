import { Company } from "../models/company_model.js"

export const registerCompany = async(req,res) => {
    try {
        const {companyName} = req.body
        if(!companyName){
            return res.status(400).json({
                message:"CompanyName is required",
                success : false
            })
        }
        let company = Company.findOne({name:companyName})
        if(!company){
            return res.status(400).json({
                message:"Company already exists",
                success: false
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(200).json({
            message:"Company registered successfully",
            company,
            success:true
        })
    } catch(error){
        console.log(error)
    }
}

export const getCompany = async(req,res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Companies found Successfully",
            companies,
            success:true
        })
    } catch(error){
        console.log(error)
    }
}

export const getCompanyById = async(req,res) =>{
    try{
        const companyId = req.params.id
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
            message: "Company not found",
            success: false
         })
        }
        return res.status(200).json({
            message:"Company found successfully",
            company,
            success:true
        })
    } catch(error){
        console.log(error)
    }
}

export const updateCompany = async(req,res) =>{
    try{
        const {name,description,website,location} = req.body
        const file = req.file
        const updateData = {name,description,website,location}
        const company = await Company.findByIdAndUpdate(req.params.id, updateData,{new:true})
        if(!company){
            return res.status(400).json({
                message : "update not successfull",
                success : false
            })
        }
        return res.status(200).json({
            message:"Company updated successfully",
            success:false
        })
    }catch(error){
        console.log(error)
    }
}