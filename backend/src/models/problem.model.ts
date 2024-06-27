import mongoose from "mongoose";

export interface ProblemDocument extends mongoose.Document{
   title : string,
   admin_id : mongoose.Types.ObjectId,
   statement : string, 
   sample : [ { input : string , output : string }],
   testcases : [ { input : string , output : string }],
   difficulty : string,
   tags : string[],
   time_limit : number,
   memory_limit : number,
   omitTestCases():Omit<ProblemDocument,"testcases" | "admin_id">
   preview() : Pick<ProblemDocument ,"title" | "tags" | "difficulty">
   // Optional field to support Markdown
   //isMarkdown : boolean
}

const ProblemSchema = new mongoose.Schema<ProblemDocument>({
    title : { type : String , unique : true , required : true } , 
    admin_id  : { type : mongoose.Schema.Types.ObjectId , ref : 'Users' },
    statement : { type : String , required : true } ,
    sample : [ { input : { type : String } , output : { type : String }}],
    testcases : [ { input : { type : String } , output : { type : String }}],
    difficulty : { type : String , enum : ['Easy' , 'Medium' , 'Hard'] }, 
    tags : [{type : String}],
    time_limit : { type : Number , required : true } ,
    memory_limit :{ type : Number , required : true }, 
})
ProblemSchema.methods.preview = function(){
    const problem = this.toObject();
    const allowed = ['title' , 'tags' , 'difficulty'];
    return Object.keys(problem).filter(key => allowed.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: problem[key]
    };
  }, {});
}
ProblemSchema.methods.omitTestCases = function (){
    const problem = this.toObject();
    delete problem.testcases;
    delete problem.admin_id;
    return problem;
}
const ProblemModel = mongoose.model<ProblemDocument>("problem", ProblemSchema);
export default ProblemModel;
