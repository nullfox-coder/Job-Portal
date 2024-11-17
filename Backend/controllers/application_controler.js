import { Application } from "../models/application_model.js"
import { Job } from "../models/job_model.js"

export const applyJob = async(req,res) => {
    try{
        const userId = req.id
        const jobId = req.params.id
        if(!jobId){
            return res.status(400).json({
                message:"Jod id is required",
                success : false
            })
        }
            //already applied
            const existingApplication = await Application.findOne({job:jobId,applicant:userId})

            if(existingApplication){
                return res.status(400).json({
                    message:"You have already applied to this job",
                    success:false
                })
            }
            // if job exists
            const job = await Job.findOne({_id:jobId})
            if(!job){
                return res.status(404).json({
                    message:"Job not found",
                    success:false
                })
            }
            // create new application
            const newApplication = Application.create({
                job:jobId,
                applicant:userId
            })
            job.applications.push(newApplication._id)
            await job.save()
            return res.status(200).json({
                messge:"Job applied successfully",
                success: true
            })
    } catch(error){
        console.log(error)
    }
}

export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                message:"No Application",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    }catch(error){
        cosnole.log(error)
    }
}

// for admin how many applicants for a particular job

export const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}


//admin updates the status
export const updateStatus = async(req,res)=>{
    try{
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        }
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }
        // updating the status

        application.status = status.toLowerCase()
        await application.save()
        return res.status(200).json({
            message:"Status updated Successfully",
            success:false
        })
    }catch(error){
        console.log(error)
    }
}