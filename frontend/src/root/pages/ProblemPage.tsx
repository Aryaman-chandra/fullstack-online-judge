import { Button } from '@/components/ui/button';
import { fetchProblem } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom'
import Markdown from 'markdown-to-jsx';
import CodeEditor from '@/components/ui/CodeEditor';
import { Loader } from '@/lib/utils/loader';
import TeX from '@matejmazur/react-katex'
const MyHeading = ({children, ...props}) => <div {...props }>{children}</div>
const MyImage = ({children ,...props}) => <img {...props}>{children}</img>
const  MyParagraph = ({children ,...props}) => <div {...props}>{children}</div>
const MyCodeBlock = ({children,...props}) => <div {...props}>{children}</div>
const renderRule =  (next:any, node:any, renderChildren:any, state:any) =>{
    if (node.type === '3' && node.lang === 'latex') {
      return (
        <TeX as="div" key={state.key}>{String.raw`${node.text}`}</TeX>
      )
    }

    return next()
  }
const options = {
    forceBlock : true,
    renderRule:renderRule  ,
    overrides : {
        h1:{
            component : MyHeading,
            props :{
                className: 'text-rose-600/100 font-bold text-sm md:text-sm'
            }
        },
        img:{
            component : MyImage,
            props :{
                className:'h-sm w-sm md:max-w-lg max-h-90h self-center'
            }
        },
        p:{
            component : MyParagraph,
            props:{
                className:'flex flex-col'
            }
        },
        code:{
            component: MyCodeBlock,
            props:{
                className: 'bg-secondary md:w-[400px] rounded-md my-4 text-foreground p-5'
            }
        }
    }
}
const ProblemPage = () => {
  let { state } = useLocation();
  if(!state) state = { p_id : window.location.pathname.split('/').pop()};
  const result:{isPending : boolean , isError: boolean , error : any , data : any} = useQuery({
      queryKey: [state.p_id],
      queryFn : () => {
          const data = fetchProblem(state.p_id);
          return data
      }
  })
  if(result.isPending)  return <div className='h-full w-full flex'><Loader isLoading={true}/></div> 
  if(result.isError) return <div className='text-red-800'>{result.error.message}</div>
  return (
    <div className='flex flex-col  items-center mx-10 md:grid md:grid-cols-5 md:grid-rows-3 md:gap-3 md:grid-flow-col md:p-2 h-full'>
        <div className=' flex w-full justify-center mx-6 md:mx-0 md:col-span-3 md:row-span-3  md:w-full md:h-full overflow-x-scroll'>
            <div className='w-full h-full  '>
                <div className='text-rose-600 md:text-2xl  font-semibold'>{result.data.title}</div>
                <Markdown options={options} className='flex flex-col  '>{`${result.data.statement}`}</Markdown>
            </div>
        </div>
        <CodeEditor problem={state.p_id}/>
     </div>
  )
}

export default ProblemPage
