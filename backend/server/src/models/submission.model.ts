import mongoose  from 'mongoose';

export interface SubmissionDocument extends mongoose.Document{
    user : mongoose.Types.ObjectId
    problem : mongoose.Types.ObjectId
    source : string 
    verdict : string
    preview():Pick<SubmissionDocument , "verdict">
}

const SubmissonSchema = new mongoose.Schema<SubmissionDocument>({
    user : { type : mongoose.Schema.Types.ObjectId , ref : 'users' }, 
    problem : { type : mongoose.Schema.Types.ObjectId , ref : 'problems'},
    source : { type : String , required : true } ,
    verdict : {
    type : String ,
    enum : ['ACCEPTED' , 'TIME_LIMIT_EXCEEDED' , 'MEMORY_LIMIT_EXCEEDED','EXECUTION_ERROR','WRONG ANSWER','COMPILATION_ERROR' , 'UNEXPECTED_ERROR'],
    default: 'UNEXPECTED_ERROR'
    },
},
{
    timestamps: true
})
                                                               

SubmissonSchema.methods.preview = function(){
    const submission = this.toObject();
    delete submission.user;
    delete submission.source;
    return submission;
}


const SubmissionModel = mongoose.model<SubmissionDocument>("submissions" ,SubmissonSchema);
export default SubmissionModel;
