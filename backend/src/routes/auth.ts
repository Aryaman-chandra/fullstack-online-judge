import { Router } from "express"
import { SignupHandler } from "../controllers/auth.controllers";
const   authRoutes = Router();

// prefix auth
authRoutes.post("/signup",SignupHandler)
authRoutes.post("/login")
//
//authRoutes.post("/login",LoginHandler)
export default authRoutes;