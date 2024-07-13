import { Router } from "express";
import { authorizeTo } from "../middlewares/authorizeTo";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createProblem , deleteProblem, fetchProblems , getMyProblems, getThisProblem, searchProblem } from "../controllers/problem.controllers";
const problemRoutes = Router();
// prefix /problems

problemRoutes.get("/" ,fetchProblems);
problemRoutes.get("/search/",searchProblem);
problemRoutes.post("/create/", isAuthenticated , authorizeTo(["admin"]) , createProblem);
problemRoutes.get("/my/",isAuthenticated,authorizeTo(["admin"]),getMyProblems)
problemRoutes.post("/delete/",isAuthenticated,authorizeTo(["admin"]),deleteProblem);
problemRoutes.get("/:p_id" ,getThisProblem);

export default problemRoutes;

