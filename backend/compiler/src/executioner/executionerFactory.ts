import cppExecutioner from "./cppExecutioner";
import executioner from "../types/executioner";

export default class executionerFactory {
    static get(filename :string , language :string):executioner{
        if(language=='cpp') return new cppExecutioner(filename);
        throw Error('Not supported');
    }
}