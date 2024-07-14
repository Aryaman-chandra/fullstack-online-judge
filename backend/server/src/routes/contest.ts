import { Router } from "express";
import { authorizeTo } from "../middlewares/authorizeTo";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { all_contests, contest_details, createContest, getMycontests, updateContest } from "../controllers/contest.controller";
const contestRoutes = Router();
// prefix /contests/

contestRoutes.get("/" ,all_contests);
contestRoutes.post("/create", isAuthenticated , authorizeTo(["admin"]) , createContest);
contestRoutes.get("/my" , isAuthenticated , authorizeTo(["admin"]) , getMycontests);
contestRoutes.post("/update/:c_id",isAuthenticated,authorizeTo(["admin"]) , updateContest);
contestRoutes.get("/details/:c_id" ,contest_details);
export default contestRoutes;

