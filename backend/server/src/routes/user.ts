import { Router } from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { editProfile, getGraph, getProfile, linkProblem, userDetails , getStats} from "../controllers/user.controller";
const  userRoutes = Router();

// prefix url:/user/
userRoutes.use(isAuthenticated);
userRoutes.get("/me",userDetails);
userRoutes.get("/stats", getStats);
userRoutes.get("/profile",getProfile)
userRoutes.post("/profile",editProfile);
userRoutes.post("/link",linkProblem);
userRoutes.get("/graph" , getGraph);
//userRoutes.post("/user/submission");

export default userRoutes;
