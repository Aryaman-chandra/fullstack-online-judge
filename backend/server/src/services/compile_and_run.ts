import { Executable } from "../types/compiler/executable";

export const compile_and_run = async ( job : Executable)=>{
    try{
        const result = await fetch('http://compiler:5000/run',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job),
        })
        const body = await result.json();
        return { status : body.statusCode, output : body.output  }
    }catch(error){
        console.log(error);
        throw new Error('Unexpected Error');
    }
}
