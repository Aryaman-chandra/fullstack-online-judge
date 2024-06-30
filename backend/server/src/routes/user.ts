import { Router } from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { editProfile, getProfile } from "../controllers/user.controller";
const  userRoutes = Router();

// prefix url:/user/
userRoutes.use(isAuthenticated);
userRoutes.get("/profile",getProfile)
userRoutes.post("/profile",editProfile);
//userRoutes.post("/user/submission");

export default userRoutes;
