import mongoose from 'mongoose';

export default async function  connectToDB( url:string): Promise<string>{
    try{
        await mongoose.connect(url);
        return 'OK';
    }
    catch(err){
        let result = err as string;
        if(typeof err == 'string')
            result = err.toUpperCase();
        else if(err instanceof Error){
            result = err.message;
        }
        console.log(result);
        return result;
    }
}
