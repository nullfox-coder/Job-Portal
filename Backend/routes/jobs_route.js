import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job_controller.js"

const router = express.Router()

router.route("/create").post(isAuthenticated,postJob)
router.route("/get").get(isAuthenticated,getAllJobs)
router.route("/getAdminJobs").get(isAuthenticated,getAdminJobs)
router.route("/get/:id").get(isAuthenticated,getJobById)

export default router