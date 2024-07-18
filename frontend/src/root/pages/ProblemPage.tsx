import { fetchProblem } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom'
import Markdown from 'markdown-to-jsx';
import CodeEditor from '@/components/ui/CodeEditor';
import { Loader } from '@/lib/utils/loader';
import TeX from '@matejmazur/react-katex'
import ProblemSearch from '@/components/ui/ProblemSearch';
import { Popover, PopoverTrigger,PopoverContent } from '@/components/ui/popover';

const MyHeading = ({children, ...props}) => <div {...props }>{children}</div>
const MyImage = ({children ,...props}) => <div className='flex justify-center'><img {...props}>{children}</img></div>
const  MyParagraph = ({children ,...props}) => <div {...props}>{children}</div>
const MyCodeBlock = ({children,...props}) => <div {...props}>{children}</div>
const MyBlockquote = ({children, ...props}) => <blockquote {...props}>{children}</blockquote>;
const MyList = ({children, ...props}) => <ul {...props}>{children}</ul>;
const MyListItem = ({children, ...props}) => <li {...props}>{children}</li>;

const renderRule =  (next:any, node:any, renderChildren:any, state:any) =>{
    if (node.type === '3' && node.lang === 'latex') {
      return (
        <TeX as="div" key={state.key}>{String.raw`${node.text}`}</TeX>
      )
    }

    return next()
  }
const options = {
    forceBlock : false,
    renderRule:renderRule  ,
overrides: {
    h1: {
      component: MyHeading,
      props: {
        className: 'text-xl font-bold text-primary mb-4 mt-6'
      }
    },
    h2: {
      component: MyHeading,
      props: {
        className: 'text-lg font-semibold text-primary mb-3 mt-5'
      }
    },
    h3: {
      component: MyHeading,
      props: {
        className: 'text-mdd font-medium text-primary mb-2 mt-4'
      }
    },
    img: {
      component: MyImage,
      props: {
        className: 'h-sm w-sm md:max-w-lg max-h-90h  my-4 rounded-lg shadow-md self-center'
      }
    },
    p: {
      component: MyParagraph,
      props: {
        className: 'mb-4 text-foreground'
      }
    },
    code: {
      component: MyCodeBlock,
      props: {
        className: 'text-sm rounded-md w-fit md:w-[400px] my-4 p-4 bg-secondary text-secondary-foreground overflow-x-auto'
      }
    },
    pre: {
      component: ({children, ...props}) => <div {...props}>{children}</div>,
      props: {
        className: 'my-4'
      }
    },
    blockquote: {
      component: MyBlockquote,
      props: {
        className: 'border-l-4 border-primary pl-4 italic my-4 text-foreground/80'
      }
    },
    ul: {
      component: MyList,
      props: {
        className: 'list-disc list-inside mb-4 pl-4'
      }
    },
    ol: {
      component: MyList,
      props: {
        className: 'list-decimal list-inside mb-4 pl-4'
      }
    },
    li: {
      component: MyListItem,
      props: {
        className: 'mb-2'
      }
    },
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
            <div className='w-full h-full overflow-auto'>
                <div className='flex w-full justify-between'>
                <div className='text-rose-600 md:text-2xl  font-semibold'>{result.data.title}</div>
                <div >
                    <Popover>
                        <PopoverTrigger><div className='h-8 w-8 mt-3 mr-6'><img src='/assets/unlink.png' /></div></PopoverTrigger>
                        <PopoverContent><ProblemSearch/></PopoverContent>
                    </Popover>
                </div>
                </div>
                <Markdown options={options} className='flex flex-col'>{`${result.data.statement}`}</Markdown>
            </div>
        </div>
        <CodeEditor problem={state.p_id}/>
     </div>
  )
}

export default ProblemPage
