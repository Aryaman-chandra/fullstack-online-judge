import { Router } from "express";
import { authorizeTo } from "../middlewares/authorizeTo";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const router = Router();
// prefix /problems

//router.get("/:page" ,fetchAllProblems);
//router.get("/:p_id" ,getThisProblem);
router.post("/create/", isAuthenticated , authorizeTo(["admin"]) , createProblem);



