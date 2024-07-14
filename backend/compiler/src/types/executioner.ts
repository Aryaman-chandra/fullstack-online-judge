export default interface executioner{
    compileCommand:string;
    executeCommand:string;
    jobId: string;
    time_limit : number;
    memory_limit : number;
    compile():Promise<void>
    run(input:string):Promise<string>
    execute(input :string):Promise<string>
}
