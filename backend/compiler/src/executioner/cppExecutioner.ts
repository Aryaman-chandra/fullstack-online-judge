import { exec, spawn } from "node:child_process";
import executioner from "../types/executioner"
import path from "path";
import util from "util";
import { CompilationError } from "./errors/CompilationError";
import { TimeLimitError } from "./errors/TimeLimitError";
import { MemoryLimitError } from "./errors/MemoryLimitError";

const outputPath = path.join(__dirname, "../outputs/");
const execPromise = util.promisify(exec);

export default class cppExecutioner implements executioner {
    compileCommand: string;
    executeCommand: string;
    jobId: string;
    time_limit: number;
    memory_limit: number;

    constructor(filename: string, time_limit: number, memory_limit: number) {
        this.jobId = path.basename(filename).split(".")[0];
        const outPath = path.join(outputPath, `${this.jobId}`);
        this.compileCommand = `g++ ${filename} -o ${outPath}`;
        this.executeCommand = `cd ${outputPath} && ./${this.jobId}`;
        this.time_limit = time_limit*1000;
        this.memory_limit = memory_limit*1048576;
    }

    async compile(): Promise<void> {
        try {
            const { stderr } = await execPromise(this.compileCommand);
            if (stderr) {
                throw new CompilationError(`Compilation error: ${stderr}`);
            }
        } catch (error: any) {
            throw new CompilationError(`Compilation failed: ${error.message}`);
        }
    }

    async run(input: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const child = spawn('sh', ['-c', `${this.executeCommand} < ${input}`], {
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

            child.stdin.end();

            const timer = setTimeout(() => {
                killed = true;
                child.kill();
                reject(new TimeLimitError(`Time limit exceeded: Execution timed out after ${this.time_limit}ms`));
            }, this.time_limit);

            const memoryChecker = setInterval(() => {
                exec(`ps -o rss= -p ${child.pid}`, (error, stdout, stderr) => {
                    if (error || stderr) {
                        clearInterval(memoryChecker);
                        return;
                    }
                    const memoryUsage = parseInt(stdout.trim()) * 1024; // Convert KB to Bytes
                    if (memoryUsage > (this.memory_limit)) {
                        clearInterval(memoryChecker);
                        killed = true;
                        child.kill();
                        reject(new MemoryLimitError(`Memory limit exceeded: ${memoryUsage}  bytes used`));
                    }
                });
            }, 100); // Check every 100ms

            child.on('close', (code) => {
                clearTimeout(timer);
                clearInterval(memoryChecker);
                if (!killed) {
                    if (code === 0) {
                        resolve(output);
                    } else {
                        reject(new Error(`Execution failed with code ${code}: ${errorOutput}`));
                    }
                }
            });
        });
    }

    async execute(input: string): Promise<string> {
        return this.run(input);
    }
}
