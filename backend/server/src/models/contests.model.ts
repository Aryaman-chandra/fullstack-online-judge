import mongoose, { Model } from "mongoose";
import { start } from "repl";
import { ProblemDocument } from "./problem.model";

export  interface ContestDocument extends mongoose.Document{
    title : string ;
    description : string;
    start_time : Date;
    end_time : Date;
    admin_id : mongoose.Types.ObjectId;
    problems : mongoose.Types.ObjectId[];
    details() : Pick<ContestDocument ,"_id"|"title" | "description" | "start_time" |"end_time">
}

const ContestSchema = new mongoose.Schema<ContestDocument>({
   title : { type : String , required: true },
   description : { type : String , required : true },
   start_time : { type : Date , required : true },
   end_time : { type : Date , required : true },
   admin_id : { type : mongoose.Schema.Types.ObjectId , ref:'users'},
   problems :[{ type : mongoose.Types.ObjectId , ref : 'problems' , required: true}] 
})

ContestSchema.methods.details =  function(){
        const contest = this.toObject();
        delete contest.admin_id;
        delete contest.problems
        return  contest;
}


const ContestModel = mongoose.model<ContestDocument>('contest', ContestSchema);

export default ContestModel;
