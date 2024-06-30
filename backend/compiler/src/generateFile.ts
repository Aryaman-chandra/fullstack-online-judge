import fs from "fs";
import path from 'path';
import { v4 as uuid } from 'uuid'; 

const dirCodes = path.join(__dirname, 'codes');
const dirInput =  path.join(__dirname, 'inputs');
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateOutputFile = (language:string,code:string) => {
    const jobID = uuid();
    const filename = `${jobID}.${language}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, code);
    return filePath;
};
export const generateInputFile = (content:string) => {
    const jobID = uuid();
    const filename = `${jobID}.input`;
    const filePath = path.join(dirInput, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
};
