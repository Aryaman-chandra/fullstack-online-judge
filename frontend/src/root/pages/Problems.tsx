import { getProblems } from '@/lib/api'
import ProblemCard from '@/components/ui/ProblemCard'
import { Loader } from '@/lib/utils/loader'
import ServerError from '@/lib/utils/serverError'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { useState } from 'react'
import ProblemRow from '@/components/ui/ProblemRow'

 interface problems{
  data : {_id:string ,title :string , tags:string[], difficulty:string}[]
}
const Problems = () => {
 const [page, setPage] = useState(1)
 const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const { isPending, isError, error, data}  = useQuery<unknown,ServerError,problems>({
    queryKey: ['problems',page],
    queryFn: async ()=>{
      const data = await  getProblems(page)
      return data
    },
    placeholderData:keepPreviousData
  })
  return (
    <div className='h-full w-full'>
      {isPending ? (
        <div className='h-full w-full'><Loader isLoading={isPending} /></div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <> 
         <Pagination>
            <PaginationContent>
            {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
              )}
              {[...Array(data.totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => handlePageChange(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {page < data.totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        <div className='flex flex-col justify-between items-center space-y-3 '>
          {data.data.map((project,index) => (
                <ProblemRow key={index} _id={project._id} title={project.title} tags={project.tags} difficulty={project.difficulty}/>
           ))}
        </div>
        </>
      )}
    </div>
   
  )
}

export default Problems
