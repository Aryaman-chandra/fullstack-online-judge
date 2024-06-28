import {  Router  } from "express"
import { logoutHandler, loginHandler, signupHandler,refreshAccessToken } from "../controllers/auth.controllers";
const   authRoutes = Router();

// prefix auth
authRoutes.post("/signup",signupHandler)
authRoutes.post("/login",loginHandler)
authRoutes.post("/logout",logoutHandler)
authRoutes.get("/refresh/",refreshAccessToken);
export default authRoutes;
