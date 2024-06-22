import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { defaults } from "../constants/defaults"

export interface Profile{
    fullname : string ,
    languages : string[],
    bio : string,
    picture : string , 
    social_media_links : { handle : string , url : string }[]
}
export interface UserDocument extends mongoose.Document{
    _id : string,
    email : string,
    password : string,
    createdAt : Date,
    updatedAt : Date,
    profile  : Profile, 
    role : string[],
    comparePassword(val : string ): Promise<boolean>;
    omitPassword() : Omit<UserDocument,"password">
    generateUsername(): void
}

const UserSchema = new mongoose.Schema<UserDocument>({
    email : { type : String , unique : true , required : true },
    password : { type : String , required : true },
    profile :{
        fullname : {
            type : String, 
        },
        languages : [{
            type : String
        }],
        bio : {
            type : String,
        },
        picture : {
            type : String
        },
        social_media_links : [{
            handle : String , 
            url : String 
        }]
    },
    role :{ type : [String], default : ['user'] }
},
    {
        timestamps : true
    },
)

UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hashValue(this.password , 8);
    next();
})
UserSchema.methods.comparePassword = async function (val :string ):Promise<boolean>{
    return await compareValue(val , this.password);
}
UserSchema.methods.omitPassword = function (){
    const user = this.toObject();
    delete user.password;
    return user;
}
UserSchema.methods.generateUsername = function(){
    if(!this.username){
        var suffix = Math.floor(Math.random()*1000);
        var prefix = defaults.USERNAME;
        this.username = `${prefix}+${suffix}`; 
    }
}
const UserModel = mongoose.model<UserDocument>("Users",UserSchema);
export default UserModel;
