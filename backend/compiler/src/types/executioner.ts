export default interface executioner{
    command:string
    getCommand(filename:string):string
    execute(input :string):Promise<string>
}
