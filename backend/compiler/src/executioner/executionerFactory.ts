import cppExecutioner from "./cppExecutioner";
import executioner from "../types/executioner";
import javaExecutioner from "./javaExecutioner";

export default class executionerFactory {
    static get(filename :string , language :string):executioner{
        if(language==='cpp') return new cppExecutioner(filename);
        else if(language==='java') return new javaExecutioner(filename);
        else
        throw Error('Not supported yet');
    }
}
