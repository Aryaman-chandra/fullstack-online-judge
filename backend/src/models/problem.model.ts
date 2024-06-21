import mongoose from "mongoose";

export interface ProblemDocument extends mongoose.Document{
   title : string,
   statement : string, 
   sample : [ { input : string , output : string }]
   testcases : [ { input : string , output : string }]
   time_limit : number
   memory_limit : number 
   // Optional field to support Markdown
   //isMarkdown : boolean
}

const ProblemSchema = new mongoose.Schema<ProblemDocument>({
    title : { type : String , unique : true , required : true } , 
    statement : { type : String , required : true } ,
    sample : [ { input : { type : String } , output : { type : String }}],
    testcases : [ { input : { type : String } , output : { type : String }}],
    time_limit : { type : Number , required : true } ,
    memory_limit :{ type : Number , required : true }, 
})
const ProblemModel = mongoose.model<ProblemDocument>("problem", ProblemSchema);
export default ProblemModel;
