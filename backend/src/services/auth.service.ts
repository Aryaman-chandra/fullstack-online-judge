import UserModel from "../models/user.model";
import { AuthenticationError } from "../errors/AuthenticationError";
import { createAccountParams, loginUserParams } from "../dtos/user";
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET!;


export const createAccount = async(data : createAccountParams) => {
    const existingUser = await UserModel.exists({ email:data.email});
    
    if(existingUser) throw new AuthenticationError('User Already Exists');

    const user = await  UserModel.create({email : data.email , password : data.password});
    const tokenUser= user.omitPassword();
    const accessToken = jwt.sign(  {tokenUser}, secret,{
        expiresIn: "30d"
    });
    return { accessToken , tokenUser};
}

export const login = async( data: loginUserParams )=>{
    const user = await UserModel.findOne({ email : data.email });
    if(!user) throw new AuthenticationError('Wrong Email or Password');
    
    const result:boolean = await user.comparePassword(data.password);

    if(!result) throw new AuthenticationError('Wrong Email or Password');
    const tokenUser = user.omitPassword();
    const accessToken  = jwt.sign(  {tokenUser}, secret,{
        expiresIn: "30d"
    });
    return { accessToken , tokenUser };
}
