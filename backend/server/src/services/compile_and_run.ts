import { Executable } from "../types/compiler/executable";

export const compile_and_run = async ( job : Executable)=>{
    try{
        const result = await fetch('http://localhost:5000/run',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job),
        })
        return { status : result.status, output : await result.json(), }
    }catch(error){
        throw new Error('Could not compile');
    }
}
