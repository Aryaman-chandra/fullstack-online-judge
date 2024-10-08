import { Router } from "express";  
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { mySubmissions, newSubmission, runTestCases } from "../controllers/submission.controllers";
const submissionRoutes = Router();

submissionRoutes.post("/new/:p_id",isAuthenticated,newSubmission);
submissionRoutes.post("/run",isAuthenticated,runTestCases);
submissionRoutes.get("/my",isAuthenticated , mySubmissions);
export default submissionRoutes
