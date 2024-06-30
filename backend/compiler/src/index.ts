import express  from 'express';
import cors from 'cors';
import { execute } from './compiler.controller';
import { initDirs} from './initOutput';
import path from 'path';
const PORT = 5000;
const app = express();


//constants
const OutputsDir =  path.join(__dirname, 'outputs');
const InputsDir = path.join(__dirname, 'inputs');
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());
app.post("/run",execute);
app.listen(PORT,async ()=>{
    console.log(`Server listening on PORT :${PORT}`);
    console.log("compiler is ready");
    await initDirs(OutputsDir)
    await initDirs(InputsDir)
})
