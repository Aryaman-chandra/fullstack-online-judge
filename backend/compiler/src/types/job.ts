export default interface Job{
    code : string
    input : string[] 
    language : 'cpp' | 'java' | 'python'
    time_limit : number 
    memory_limit : number
}
