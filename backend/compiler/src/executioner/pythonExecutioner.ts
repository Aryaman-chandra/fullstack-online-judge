import { spawn } from "node:child_process";
import executioner from "../types/executioner"
import path from "path";
import { TimeLimitError } from "./errors/TimeLimitError";
import { MemoryLimitError } from "./errors/MemoryLimitError";

const outputPath = path.join(__dirname, "../outputs/python");

export default class pythonExecutioner implements executioner {
    executeCommand: string;
    jobId: string;
    time_limit: number;
    memory_limit: number;

    constructor(filename: string, time_limit: number, memory_limit: number) {
        this.jobId = path.basename(filename).split(".")[0];
        this.executeCommand = `python3 ${filename}`;
        this.time_limit = time_limit ;
        this.memory_limit = memory_limit ;
    }
    compileCommand="Something in the way" ;
    compile(): Promise<void> {
        return new Promise<void>(()=> undefined); 
    }

    async run(input: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const child = spawn('python3', ['-c', `
import resource, sys

def limit_memory(max_memory):
    soft, hard = resource.getrlimit(resource.RLIMIT_AS)
    resource.setrlimit(resource.RLIMIT_AS, (max_memory, hard))

limit_memory(${this.memory_limit})

with open('${this.jobId}.py', 'r') as file:
    exec(file.read())
            `], {
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

            child.stdin.write(input);
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
                        if (errorOutput.includes("MemoryError")) {
                            reject(new MemoryLimitError(`Memory limit exceeded: ${this.memory_limit} bytes`));
                        } else {
                            reject(new Error(`Execution failed with code ${code}: ${errorOutput}`));
                        }
                    }
                }
            });
        });
    }

    async execute(input: string): Promise<string> {
        return this.run(input);
    }
}
