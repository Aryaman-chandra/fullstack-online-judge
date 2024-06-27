import { Router } from "express";
import { authorizeTo } from "../middlewares/authorizeTo";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createProblem , fetchProblems , getThisProblem } from "../controllers/problem.controllers";
const problemRoutes = Router();
// prefix /problems

problemRoutes.get("/" ,fetchProblems);
problemRoutes.get("/:p_id" ,getThisProblem);
problemRoutes.post("/create/", isAuthenticated , authorizeTo(["admin"]) , createProblem);

export default problemRoutes;

