import { Profile } from "../models/user.model"

export interface User{
    _id : string, 
    email: string
    profile: Profile
}
