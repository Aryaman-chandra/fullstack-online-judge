import { NextFunction, Response , Request} from "express";
import ContestModel from "../models/contests.model"
import { z } from 'zod';
import { problemSchema } from "./problem.controllers";
import ProblemModel from "../models/problem.model";
import { BadRequestError } from "../errors/BadRequestError";
const contestSchema = z.object({
title: z.string().min(1, 'Title is required'),
description: z.string().min(1, 'Description is required'),
start_time: z.string(),
end_time: z.string(),
problems:z.array(problemSchema.extend({_id : z.string()}))
});


export const all_contests = async (req : Request , res : Response , next:NextFunction)=>{
    try{
        const currentTime = new Date().toUTCString();
        const ongoing = await ContestModel.find({ start_time: { $lte: currentTime }, end_time: { $gt: currentTime } }).select("-admin_id");
        const upcoming = await ContestModel.find({ start_time: { $gt: currentTime } }).select("-admin_id");
        const past = await ContestModel.find({ end_time: { $lte: currentTime } }).select("-admin_id");
       return res.status(200).json({ ongoing , upcoming , past });
                                    
    }catch(error){
        next(error);
    }
}

export const createContest = async  (req : Request , res : Response , next:NextFunction)=>{
    try{
        const validatedData = contestSchema.parse({...req.body});

    // Create problems
    const createdProblems = await Promise.all(validatedData.problems.map(async (problem) => {
      const newProblem = new ProblemModel({
        ...problem,
        admin_id: req.user._id,
        type: 'contest'
      });
      return await newProblem.save();
    }));

    // Create contest
    const newContest = new ContestModel({
      ...validatedData,
      admin_id: req.user._id,
      problems: createdProblems.map(problem => problem._id)
    });
    const savedContest = await newContest.save();

    return res.status(200).json({...savedContest});
    }catch(error){
        next(error)
    }
}

export const contest_details = async  (req : Request , res : Response , next:NextFunction)=>{
    try {
        const c_id = req.params.c_id;
        if(!c_id) throw new BadRequestError("Contest ID not found");
        const contest = await ContestModel.findById(c_id).populate({ path:'problems' , select: '_id title difficulty'}).exec();
        if(!contest) throw new BadRequestError("Contest Not found");
        const current = new Date(Date.now());
        const contest_date = new Date(contest.start_time);
        if(current < contest_date){
            const response = contest.details();
            return res.status(200).json({ contest : {...response}} );
        }
        let result = contest.toObject() ;
        
        return res.status(200).json({ contest : {...result } } ); 
    } catch (error) {
       next(error); 
    }
}

export const getMycontests =  async  (req : Request , res : Response , next:NextFunction)=>{
    try {
       const contests = await ContestModel.find({ admin_id : req.user._id }).populate('problems').exec();
       return res.status(200).json({contests});
    } catch (error) {
       next(error); 
    }
}

export const updateContest =  async  (req : Request , res : Response , next:NextFunction)=>{
    try {
        const contestId = req.params.c_id;
        const validatedData = contestSchema.parse({ ...req.body });
        // Find the existing contest
        const existingContest = await ContestModel.findById(contestId);
        if (!existingContest) {
            throw Error('Contest Not Found');
        }

        // Ensure the user updating the contest is the admin
        if (existingContest.admin_id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: "Not authorized to update this contest" });
        }

        // Update problems
        const updatedProblems = await Promise.all(validatedData.problems.map(async (problem) => {
          if (problem._id) {
            // If problem has an ID, update existing problem
            await ProblemModel.findByIdAndUpdate(problem._id, {
              ...problem,
              admin_id: req.user._id,
              type: 'contest'
            });
            return problem._id;
          } else {
            // If problem doesn't have an ID, create new problem
            const newProblem = new ProblemModel({
              ...problem,
              admin_id: req.user._id,
              type: 'contest'
            });
            const savedProblem = await newProblem.save();
            return savedProblem._id;
          }
        }));

        // Remove problems that are no longer in the updated list
        const problemsToRemove = existingContest.problems.filter(
          (problemId) => !updatedProblems.includes(problemId.toString())
        );
        await ProblemModel.deleteMany({ _id: { $in: problemsToRemove } });

        // Update contest
        const updatedContest = await ContestModel.findByIdAndUpdate(
          contestId,
          {
            ...validatedData,
            admin_id: req.user._id,
            problems: updatedProblems
          },
          { new: true } // This option returns the updated document
        );

        return res.status(200).json({ updatedContest , message : "Succesfull Update" });           
    } catch (error) {
       next(error); 
    }
}
