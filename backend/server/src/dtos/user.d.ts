import { Profile } from "../models/user.model"
import mongoose from "mongoose"
export interface User{
    _id : string, 
    email: string
    profile: Profile
    links : { source : mongoose.Types.ObjectId , target : mongoose.Types.ObjectId }[]
    nodes : { title : string , id : string , group : string }[] 
}
