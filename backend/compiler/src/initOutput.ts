import { exec } from "node:child_process";


// makes a directory named directories to store the output files 
// make one if it doesn't exists otherwise nothing 

export const initDirs = async (directory:string)=>{
    return new Promise((resolve, reject) => {
        exec(
           `mkdir -p ${directory}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${error} ${stderr}`);
                }
                if (stderr) {
                    reject(`${stderr}`);
                }
                resolve('');
            }
        );
    });
}