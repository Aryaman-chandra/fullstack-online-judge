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
    const [tabsValue , setTabsValue] = useState('Input');

    const onSubmit = async(data:any)=>{
      let result:any;
      result = await submitSolution(data.payload); 
      return result;
      
  }
const getVerdictColor = (verdict) => {
    if (!verdict) return 'text-gray-500';
    switch (verdict.toLowerCase()) {
      case 'accepted': return 'text-green-500';
      case 'wrong answer': return 'text-red-500';
      case 'compilation_error': return 'text-red-500';
      case 'time_limit_exceeded': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };
  const onRun = async(data:any) =>{
      const result = await runCode(data.payload);
      return result;
  }

  const submitMutation = useMutation({
      mutationFn : onSubmit,
      onSuccess:(result)=>{  
          return result
      },
      onError:(err:Error)=>{
        console.log(err);
      }
  });

  const runMutation = useMutation({
      mutationFn : onRun,
      onSuccess:(result)=>{  
          if (result.status===200) 
          setOutput(result.output); 
          else 
          setOutput(result.output);
          return result
      },
      onError:(err:Error)=>{
        console.log(err);
      }
  });
  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="Input" className="w-full md:h-60" value={tabsValue} onValueChange={setTabsValue}>
        <TabsList>
          <TabsTrigger value="Input">Input</TabsTrigger>
          <TabsTrigger value="Output">Output</TabsTrigger>
          <TabsTrigger value="Verdict">Verdict</TabsTrigger>
        </TabsList>
        <TabsContent className="h-[80%]" value="Input">
          <Textarea className="w-full h-48 max-h-[90%] text-gray-300 mt-4 mx-1 p-3 resize-none"
          value={value} onChange={(value)=>setValue(value.target.value)}
          placeholder="Custom Input"
          />
        </TabsContent>
        <TabsContent className="h-[80%]" value="Output">
        {runMutation.isPending? <div className="flex h-full w-full justify-center items-center"><Loader isLoading={runMutation.isPending}/></div>:
        <Textarea className="w-full h-48 max-h-[90%] text-white mt-4 mx-1 p-3 resize-none" disabled={true} value={runMutation.isSuccess? output:''}/>}
        </TabsContent>
        <TabsContent className="h-[80%]" value="Verdict">
          {submitMutation.isPending ? (
            <div className="flex h-full w-full justify-center items-center">
              <Loader isLoading={submitMutation.isPending}/>
            </div>
          ) : (
                   <div className="w-full h-48 max-h-[90%] text-rose-100 mt-4 mx-1 p-4 rounded-lg shadow-inner bg-black border border-rose-800 overflow-scroll">
          {submitMutation.isSuccess && submitMutation.data && (
            <div className="flex flex-col space-y-4 h-full">
              <div className={`text-2xl font-bold ${getVerdictColor(submitMutation.data.verdict)} text-center px-2 py-1 rounded-md bg-opacity-20 backdrop-filter backdrop-blur-sm`}>
                {submitMutation.data.verdict}
              </div>
              <div className={`flex-1 overflow-scroll p-3 rounded-md ${
                submitMutation.data.status === "COMPILATION_ERROR" 
                  ? 'bg-red-900 bg-opacity-30 border border-red-700' 
                  : 'bg-rose-900 bg-opacity-20 border border-rose-700'
              }`}>
                {submitMutation.data.status === "COMPILATION_ERROR" && (
                  <h3 className="text-lg font-semibold mb-0 text-red-300">
                    Compilation Error:
                  </h3>
                )}
                <pre className={`text-sm whitespace-pre-wrap ${
                  submitMutation.data.status === "COMPILATION_ERROR" 
                    ? 'text-red-200' 
                    : 'text-rose-200'
                }`}>
                  {submitMutation.data.output}
                </pre>
              </div>
            </div>
          )}
        </div>          )}
        </TabsContent>
          </Tabs>
      <div className="mt-2 space-x-6">
        <Button onClick={()=> { setTabsValue("Output"); runMutation.mutate({payload:{code : payload.payload.code , language: payload.payload.language , testcases:value} , key: 2})}}>Run</Button>
        <Button onClick={()=> { setTabsValue("Verdict"); submitMutation.mutate( { payload:payload.payload })}}>Submit</Button>
      </div>
    </div>
  );
}

export default CodeOutputTab
