import {  Router  } from "express"
import { logoutHandler, loginHandler, signupHandler } from "../controllers/auth.controllers";
const   authRoutes = Router();

// prefix auth
authRoutes.post("/signup",signupHandler)
authRoutes.post("/login",loginHandler)
authRoutes.post("/logout",logoutHandler)
export default authRoutes;