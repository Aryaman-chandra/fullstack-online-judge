import { Router } from "express";
const router = Router();
// prefix /problems

router.get("/" ,fetchAllProblems);
router.get("/:p_id" ,getThisProblem);



