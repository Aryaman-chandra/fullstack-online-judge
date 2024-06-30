export default interface Job{
    code : string
    input : string[] 
    language : 'cpp' | 'java' | 'python'
    time_limit : string 
    memory_limit : string
}
