import cppExecutioner from "./cppExecutioner";
import executioner from "../types/executioner";
import javaExecutioner from "./javaExecutioner";
import pythonExecutioner from "./pythonExecutioner";

export default class executionerFactory {
    static get(filename :string , language :string , timeLimit:number , memoryLimit:number ):executioner{
        if(language==='cpp') return new cppExecutioner(filename, timeLimit , memoryLimit);
        else if(language==='java') return new javaExecutioner(filename, timeLimit , memoryLimit);
        else if(language==='python') return new pythonExecutioner(filename , timeLimit , memoryLimit);
        else
        throw Error('Not supported yet');
    }
}
