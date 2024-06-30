import { Button } from '@/components/ui/button';
import { fetchProblem } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown';
import CodeEditor from '@/components/ui/CodeEditor';
import { Loader } from '@/lib/utils/loader';
const ProblemPage = () => {
  let { state } = useLocation();
  const result:{isPending : boolean , isError: boolean , error : any , data : any} = useQuery({
      queryKey: [state.p_id],
      queryFn : () => {
          const data = fetchProblem(state.p_id);
          return data
      }
  })
  if(result.isPending)  return <Loader height='4px' isLoading={true}/> 
  if(result.isError) return <div className='text-red-800'>{result.error.message}</div>
  return (
    <div className='flex flex-col  items-center mx-10 md:grid md:grid-cols-5 md:grid-rows-3 md:gap-5 md:grid-flow-col md:p-4 h-full'>
        <div className=' flex w-full justify-center mx-6 md:mx-0 md:col-span-3 md:row-span-3  md:w-full md:h-full overflow-x-scroll'>
            <div className='w-full h-full'>
                <Markdown>{`${result.data.statement}`}</Markdown>
            </div>
        </div>
        <div className=' w-full justify-center mx-6 md:mx-0  md:col-span-2 md:row-span-2 md:w-full md:h-full'>
            <div className='w-full h-full'> 
                <CodeEditor/>
            </div>
        </div>
        <div className='flex mx-8 justify-center  md:mx-0 md:col-span-2 md:row-span-1'>
            <Button>Submit</Button>
        </div>
     </div>
  )
}

export default ProblemPage
