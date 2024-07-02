import ProblemCard from '@/components/ui/ProblemCard'
import { getProblems } from '@/lib/api'
import ServerError from '@/lib/utils/serverError'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

 interface problems{
  data : {_id:string ,title :string , tags:string[], difficulty:string}[]
}
const Problems = () => {
  var page:number = 1;
  const { isPending, isError, error, data}  = useQuery<unknown,ServerError,problems>({
    queryKey: ['problems',page],
    queryFn: async ()=>{
      const data = await  getProblems(page)
      return data
    },
    placeholderData:keepPreviousData
  })
  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className='flex flex-col justify-between items-center space-y-5 '>
          {data.data.map((project,index) => (
                <ProblemCard key={index} _id={project._id} title={project.title} tags={project.tags} difficulty={project.difficulty}/>
           ))}
        </div>
      )}
    </div>
   
  )
}

export default Problems
