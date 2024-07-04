import { exec } from "node:child_process";
import executioner from "../types/executioner"
import path from "path";
import util from "util";
import { CompilationError } from "./errors/CompilationError";

const outputPath = path.join(__dirname, "../outputs");
const execPromise = util.promisify(exec);

export default class javaExecutioner implements executioner {
    compileCommand: string;
    executeCommand: string;
    jobId: string;

    constructor(filename: string) {
        this.jobId = path.basename(filename).split(".")[0];
        const outPath = path.join(outputPath, `${this.jobId}`);
        this.compileCommand = `javac ${filename} -d ${outPath}`;
        this.executeCommand = `java ${this.jobId}`;
    }

     async compile(): Promise<void> {
        try {
            const { stderr } = await execPromise(this.compileCommand);
            if (stderr) {
                throw new CompilationError(`Compilation error: ${stderr}`);
            }
        } catch (error:any) {
            throw new CompilationError(`Compilation failed: ${error.message}`);
        }
    }

     async run(input: string): Promise<string> {
        const runCommand = `${this.executeCommand} < ${input}`;
        try {
            const { stdout, stderr } = await execPromise(runCommand);
            if (stderr) {
                throw new Error(`Runtime error: ${stderr}`);
            }
            return stdout;
        } catch (error:any) {
            throw new Error(`Execution failed: ${error.message}`);
        }
    }

    async execute(input: string): Promise<string> {
        await this.compile();
        return this.run(input);
    }
}
