import Editor, { Monaco } from '@monaco-editor/react'
import { useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import CodeOutputTab from './CodeOutputTab';
function CodeEditor(problem:string) {

    const editorRef = useRef()
    const [value,setValue] = useState("");
    const [language,setLanguage] = useState("cpp");

    const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco)=>{
            editorRef.current = editor;
            editor.focus;
    }
    const payload = {
      code : value,
      language : language,
      p_id: problem.problem as string
  }
    const onChange = (value:string|undefined)=>{
        if(value)
        setValue(value)
    }

    const onRun = ()=>{}
    

  return (
    <>
      <div className=" w-full justify-center mx-6 md:mx-0  md:col-span-2 md:row-span-2 md:w-full md:h-full">
        <div className="w-full h-full flex flex-col ">
          <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="md:w-[150px]">
              <SelectValue placeholder="language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-4"></div>
          <Editor
            height="80%"
            width="100%"
            theme="vs-dark"
            defaultLanguage="cpp"
            language={language}
            defaultValue="//Enter your code here"
            onMount={onMount}
            value={value}
            onChange={onChange}
          />
          <div className='h-10'></div>
           <hr className="border-primary justify-self-end" />
        </div>
       
      </div>
      <div className="flex mx-8  justify-evenly md:mx-0 md:col-span-2  md:row-span-1 md:w-full md:h-full">
        <CodeOutputTab  payload={payload}/>
      </div>
    </>
  );
}

export default CodeEditor
