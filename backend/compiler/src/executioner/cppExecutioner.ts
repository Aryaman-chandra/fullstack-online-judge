import { exec } from "node:child_process";
import executioner from "../types/executioner"
import path from "path";
const outputPath = path.join(__dirname, "../outputs");
export default class cppExecutioner implements executioner{
    command: string;
    constructor(filename :string){
        this.command = this.getCommand(filename);
    };
    getCommand(filename: string): string {
        const jobId = path.basename(filename).split(".")[0];
        const outPath = path.join(outputPath, `${jobId}`);
        return  `g++ ${filename} -o  ${outPath} && cd ${outputPath} && ${outPath}`;
    }
    execute(input: string): Promise<string> {
        const execCommand =  `${this.command} < ${input}`;
        return new Promise((resolve, reject) => {
            exec(
               execCommand,
                (error, stdout, stderr) => {
                    if (error) {
                        reject(`${error} ${stderr}`);
                    }
                    if (stderr) {
                        reject(`${stderr}`);
                    }
                    resolve(`${stdout}`);
                }
            );
        });
    }
    
}
