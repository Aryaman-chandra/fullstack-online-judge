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

// Don't worry even though the port is decided to be 5000 it will only be accesible 
// through our server container on the same docker network. 

/*
* The string '0.0.0.0' in the context of network programming has a special meaning. Let me explain its significance:

* Meaning:
    '0.0.0.0' is a special IP address that means "all IPv4 addresses on the local machine".
    In server applications:
    When a server binds to '0.0.0.0', it means the server is listening on all available network interfaces on the host.
    Contrast with localhost:

    '127.0.0.1' or 'localhost' means "this computer" but only via the loopback interface.
    '0.0.0.0' means "any IPv4 address on this computer".


* In Docker context:
    Using '0.0.0.0' is particularly important in Docker containers because:

    It allows the application to be accessible from outside the container.
    If you bind to 'localhost' inside a container, the app will only be accessible within that container.

*/

app.listen(PORT,'0.0.0.0',async ()=>{
    console.log(`Server listening on PORT :${PORT}`);
    console.log("compiler is ready");
    await initDirs(OutputsDir)
    await initDirs(InputsDir)
})

