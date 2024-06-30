import Editor from '@monaco-editor/react'
import { useRef, useState } from 'react';
function CodeEditor() {
    const editorRef = useRef()
    const [value,setValue] = useState("");
    const onMount = (editor:any)=>{
            editorRef.current = editor;
            editor.focus;
    }
    const onChange = (value:string|undefined)=>{
        if(value)
        setValue(value)
    }
  return (
    <Editor 
        height="100%"
        width="100%"
        theme='vs-dark'
        defaultLanguage='cpp'
        defaultValue='//Enter your code here'
        onMount={
            onMount
        }
        value={value}
        onChange={onChange}
    />
  )
}

export default CodeEditor
