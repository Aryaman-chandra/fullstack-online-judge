import mongoose  from 'mongoose';

export interface SubmissionDocument extends mongoose.Document{
    user : mongoose.Types.ObjectId
    problem : mongoose.Types.ObjectId
    source : string 
    status : string
    verdict : string
    preview():Pick<SubmissionDocument , "status"|"verdict">
}

const SubmissonSchema = new mongoose.Schema<SubmissionDocument>({
    user : { type : mongoose.Schema.Types.ObjectId , ref : 'users' }, 
    problem : { type : mongoose.Schema.Types.ObjectId , ref : 'problems'},
    source : { type : String , required : true } ,
    status : { type : String , enum : ['inQueue' , 'running' , 'finished']},
    verdict : { type : String , enum : ['Accepted' , 'TLE' , 'MLE','Rejected','Skipped']}
})

SubmissonSchema.methods.preview = function(){
    const submission = this.toObject();
    delete submission.user;
    delete submission.source;
    return submission;
}


const SubmissionModel = mongoose.model<SubmissionDocument>("submissions" ,SubmissonSchema);
export default SubmissionModel;
