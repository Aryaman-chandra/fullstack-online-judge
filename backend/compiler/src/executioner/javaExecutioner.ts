const fs = require('fs').promises;
import { exec, spawn } from "node:child_process";
import executioner from "../types/executioner"
import path from "path";
import util from "util";
import { CompilationError } from "./errors/CompilationError";
import { TimeLimitError } from "./errors/TimeLimitError";
import { MemoryLimitError } from "./errors/MemoryLimitError";

const outputPath = path.join(__dirname, "../outputs/java");
const execPromise = util.promisify(exec);

export default class javaExecutioner implements executioner {
    compileCommand: string;
    executeCommand: string;
    jobId: string;
    time_limit: number;
    memory_limit: number;
    mainClass: string;
    outPath: string;

    constructor(filename: string, time_limit: number, memory_limit: number) {
        this.jobId = path.basename(filename).split(".")[0];
        this.outPath = path.join(outputPath, this.jobId);
        this.compileCommand = `javac -verbose -d "${this.outPath}" "${filename}"`;
        this.executeCommand = `cd "${this.outPath}" && java -Xmx${memory_limit*1048576/1024}k`;
        this.time_limit = time_limit*1000;
        this.memory_limit = memory_limit;
        this.mainClass = '';
    }

    async compile(): Promise<void> {
        try {
            const { stdout, stderr } = await execPromise(this.compileCommand);
            this.mainClass = this.findMainClass(stderr);
        } catch (error: any) {
            const lines = error.message.split('\n');
            let output = '';

            for (const line of lines) {
                if (line.includes('[parsing completed')) {
                    break;
                }
                    output += line + '\n';
            }

            throw new CompilationError(`Compilation failed: ${output.trim()}`);
        }
    }

    findMainClass(compilerOutput: string): string {
        const lines = compilerOutput.split('\n');
        for (const line of lines) {
            if (line.includes('[wrote')) {
                const match = line.match(/\[wrote\s+(.+)\.class\]/);
                if (match && match[1]) {
                    return path.basename(match[1]);
                }
            }
        }
        throw new Error("Unable to find main class in compiler output");
    }

    async run(input: string): Promise<string> {
        if (!this.mainClass) {
            throw new Error("Main class not set. Make sure to compile first.");
        }

        const fullExecuteCommand = `${this.executeCommand} ${this.mainClass}`;
        const fileContents = await fs.readFile(input, 'utf8');
        return new Promise( (resolve, reject) => {
            const child = spawn('sh', ['-c', fullExecuteCommand], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let output = '';
            let errorOutput = '';
            let killed = false;

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });
            
            child.stdin.write(fileContents);
            child.stdin.end();

            const timer = setTimeout(() => {
                killed = true;
                child.kill();
                reject(new TimeLimitError(`Time limit exceeded: Execution timed out after ${this.time_limit}ms`));
            }, this.time_limit);

            child.on('close', (code) => {
                clearTimeout(timer);
                if (!killed) {
                    if (code === 0) {
                        resolve(output);
                    } else {
                        if (errorOutput.includes("java.lang.OutOfMemoryError")) {
                            reject(new MemoryLimitError(`Memory limit exceeded: ${this.memory_limit}k`));
                        } else {
                            reject(new Error(`Execution failed with code ${code}: ${errorOutput}`));
                        }
                    }
                }
            });
        });
    }

    async execute(input: string): Promise<string> {
        await this.compile();
        const output = await this.run(input);
        return output;
    }
}
