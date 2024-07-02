import { useState } from "react"
import { Button } from "./button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Textarea } from "./textarea"
import { Loader } from "@/lib/utils/loader"
import { submitSolution } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"


const CodeOutputTab = (payload:{
  code : string,
  language : string,
  p_id : string
}) => {
    const [value,setValue] = useState('');
    const [errorA , setErrorA] = useState('');
    const onSubmit = async(data:any)=>{
      const result = await submitSolution(data); 
      return result.data;
  }
  const submiMutation = useMutation({
      mutationFn : onSubmit,
      onSuccess:(result)=>{ return result.data },
      onError:(err:Error)=>{
        setErrorA(err.message)
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
          <Textarea className="w-full h-48 max-h-[90%] text-gray-400 mt-4 mx-1 p-3 resize-none"
          value={value} onChange={(value)=>setValue(value.target.value)}
          placeholder="Custom Input"
          />
        </TabsContent>
        <TabsContent className="h-[80%]" value="Output">
        {submiMutation.isPending? <div className="flex h-full w-full justify-center items-center"><Loader isLoading={submiMutation.isPending}/></div>:
        <Textarea className="w-full h-48 max-h-[90%] text-gray-400 mt-4 mx-1 p-3 resize-none" disabled={true} />}
        </TabsContent>
      </Tabs>
      <div className="mt-3 space-x-6">
        <Button>Run</Button>
        <Button onClick={()=>submiMutation.mutate(payload.payload)}>Submit</Button>
      </div>
    </div>
  );
}

export default CodeOutputTab
