import { useState } from "react"
import { Button } from "./button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Textarea } from "./textarea"
import { Loader } from "@/lib/utils/loader"
import { runCode, submitSolution } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"


const CodeOutputTab = (payload:{
  code : string,
  language : string,
  p_id : string
}) => {
    const [value,setValue] = useState('');
    const [output,setOutput] =useState('');
    const onSubmit = async(data:any)=>{
      let result:any;
      console.log(data.payload)
      if(data.key==1)  result = await submitSolution(data.payload); 
      else result = await runCode(data.payload);
      return result;
      
  }
  const mutation = useMutation({
      mutationFn : onSubmit,
      onSuccess:(result)=>{  
          if (result.status===200) 
          setOutput(result.output); 
          else 
          setOutput(result.output.message);
          return result
      },
      onError:(err:Error)=>{
        console.log(err);
      }
  });
  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="Input" className="w-full md:h-60">
        <TabsList>
          <TabsTrigger value="Input">Input</TabsTrigger>
          <TabsTrigger value="Output">Output</TabsTrigger>
        </TabsList>
        <TabsContent className="h-[80%]" value="Input">
          <Textarea className="w-full h-48 max-h-[90%] text-gray-300 mt-4 mx-1 p-3 resize-none"
          value={value} onChange={(value)=>setValue(value.target.value)}
          placeholder="Custom Input"
          />
        </TabsContent>
        <TabsContent className="h-[80%]" value="Output">
        {mutation.isPending? <div className="flex h-full w-full justify-center items-center"><Loader isLoading={mutation.isPending}/></div>:
        <Textarea className="w-full h-48 max-h-[90%] text-white mt-4 mx-1 p-3 resize-none" disabled={true} value={mutation.isSuccess? output:''}/>}
        </TabsContent>
      </Tabs>
      <div className="mt-3 space-x-6">
        <Button onClick={()=>{mutation.mutate({payload:{code : payload.payload.code , language: payload.payload.language , testcases:value} , key: 2})}}>Run</Button>
        <Button onClick={()=>mutation.mutate({ payload:payload.payload , key: 1})}>Submit</Button>
      </div>
    </div>
  );
}

export default CodeOutputTab
