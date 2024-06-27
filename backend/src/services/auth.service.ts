import UserModel from "../models/user.model";
import { AuthenticationError } from "../errors/AuthenticationError";
import { createAccountParams, loginUserParams } from "../params/user.params";
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;


export const createAccount = async(data : createAccountParams) => {
    const existingUser = await UserModel.exists({ email:data.email});
    
    if(existingUser) throw new AuthenticationError('User Already Exists');

    const user = await  UserModel.create({username: data.username , email : data.email , password : data.password});
    const tokenUser= user.omitPassword();
    const accessToken = jwt.sign(  {tokenUser}, secret,{
        expiresIn: "15m"
    });
    const refreshToken = jwt.sign({ tokenUser } , refreshSecret , {
        expiresIn: "30d"
    });
    user.refresh_token = refreshToken;
    await user.save();
    return { refreshToken , accessToken , user};
}

export const login = async( data: loginUserParams )=>{
    const user = await UserModel.findOne({ email : data.email });
    if(!user) throw new AuthenticationError('Wrong Email or Password');
    
    const result:boolean = await user.comparePassword(data.password);

    if(!result) throw new AuthenticationError('Wrong Email or Password');
    const tokenUser = user.omitPassword();
    const accessToken  = jwt.sign(  {tokenUser}, secret,{
        expiresIn: "15m"
    });
    var refreshToken =user.refresh_token;
    if(!user.refresh_token){
        refreshToken = jwt.sign({ tokenUser } , refreshSecret , {
            expiresIn: "30d"
        });
    }
    return { accessToken , tokenUser , refreshToken };
}
