import UserModel from "../models/user.model";
import { AuthenticationError } from "../errors/AuthenticationError";
import { createAccountParams } from "../dtos/user";
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET!;
var createdUserFields :string = 'email _id username'
export const createAccount = async(data : createAccountParams) => {
    const existingUser = await UserModel.exists({ email:data.email});
    if(existingUser)
    throw new AuthenticationError('User Already Exists');
    const user = await  UserModel.create({email : data.email , password : data.password});
    const tokenUser= user.omitPassword();
    const accessToken = jwt.sign(  {tokenUser}, secret,{
        expiresIn: "15m"
    });
    return { accessToken , tokenUser};
}
