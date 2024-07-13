export default interface executioner{
    compileCommand:string;
    executeCommand:string;
    jobId: string;
    compile():Promise<void>
    run(input:string):Promise<string>
    execute(input :string):Promise<string>
}
