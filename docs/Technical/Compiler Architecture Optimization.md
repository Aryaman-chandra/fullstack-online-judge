
## Compiler 
In this project , we have divided our backend  application into two parts one being our backend server and other being our compiler 
![[Submission Workflow#Submission Architecture]]


Our server makes a request to compiler server ,

So far we have only two usecases :
1. **Run our testcases**
2. **Run custom testcase for user **

It maybe tempting to write two endpoints for compiler one for submit and for running custom input.
But one thing to consider is that all our compiler does is that it runs  code and returns some output ,
So for both of our usecase we really only need one request endpoint that is to run our code 
and we can create an interface for the request.

That enables us to use a single request for both our 
![[Compiler Req-Res Cycle.svg|1500]]

<div style="page-break-after: always;"></div>

## 
```typescript

export const newSubmission  = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const valid = submissionSchema.parse({
            ...req.body,
        })
        const submission = await SubmissionModel.create({ user : req.user.id , source : valid.code } );
        const p_id: string = req.params.p_id;
        const problem = await ProblemModel.findById(p_id);
        if(!problem) throw new BadRequestError('Problem Not Found');
        const executeJob :Executable= {
            code :  valid.code,
            language : valid.language,
            input : problem.getTestCases()
        }
        const result = await compile_and_run(executeJob); 
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
}

export const runTestCases = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const valid = { ...req.body } ;
        const inputData:string[] = [req.body.testcases]; 
        const executeJob : Executable = {
            code : valid.code ,
            language : valid.language,
            input : inputData 
        }
        const result = await compile_and_run(executeJob);
        return res.status(200).json(result);
    }
    catch(error){
        next(error)
    }
}
```

### Interface
```typescript
export interface Executable{
    code : string 
    language : string 
    input : string[]
}
```

### Compiler Request

```typescript
export const compile_and_run = async ( job : Executable)=>{
    try{
        const result = await fetch('http://localhost:5000/run',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job),
        })
        return { status : result.status, output : await result.json(), }
    }catch(error){
        throw new Error('Could not compile');
    }
}

```

### Compiler Code
```typescript
//request route
app.post("/run",execute);
// request handler

export const execute = async ( req: Request<any, any , Job> , res : Response , next : NextFunction) =>{
    try{
        const valid = { ...req.body };
        const filePath =  generateOutputFile(valid.language , valid.code);
        const result:executioner = executionerFactory.get(filePath,valid.language); 
        let output : string[]= [];
        for(var index in valid.input){
            const inputFilePath = generateInputFile(valid.input[index]);
            const message = await result.execute(inputFilePath);
            output.push(message);
        }
        return res.status(200).json(output);        
    }catch(error){
        next(error);
    }
}


```

