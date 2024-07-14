import { getGraph, LinkProblems, searchProblem } from "@/lib/api";
import { Loader } from "@/lib/utils/loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { Button } from "./button";
import { useQueryClient } from "@/config/queryClient";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

const ProblemSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const sourceProblem:string = window.location.pathname.split('/').pop() ?? '';
  const queryClient = useQueryClient();
  const Link = async (value:string) =>{
      const data = await LinkProblems( { source : sourceProblem , target : value })
      return data;
  }

  const {mutate,isSuccess } = useMutation({
     mutationFn: Link, 
     onSuccess :()=>{
         queryClient.invalidateQueries({queryKey:['GraphData']})
         setOpen(false)
     }
  })


  const searchProblems = async () => {
    if (!searchTerm.trim()) return [];
    const data = await searchProblem(searchTerm);
    return data;
  };

  const result = useQuery({
    queryKey: ["searchProblem", searchTerm],
    queryFn: searchProblems,
    enabled: false,
    staleTime: 0
  });
    
  // Debounced refetch function
  const debouncedRefetch = useCallback(
    debounce(() => {
      result.refetch();
    }, 500),
    [result.refetch]
  );
  function changeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    debouncedRefetch();
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={changeSearch}
        placeholder="Search problems..."
        className="w-full bg-stone-900 px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="w-full h-[50%] mt-2">
        {result.isFetching ? (
          <Loader isLoading={result.isFetching} />
        ) : result.isSuccess? (
          <div >
            {result.data.results && result.data.results.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {result.data.results.map((problem) => (
                  <li key={problem._id} className="border p-2 flex flex-col border-rose-700 rounded-md">
                    <div>
                        <h3 className="font-semibold">{problem.title}</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                    <p className="text-sm text-gray-600">Difficulty: {problem.difficulty}</p>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                            <Button className="bg-blue-700" >link</Button> 
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirm Linking</DialogTitle>
                                    <DialogDescription>
                                    Are you sure you want to link these problems?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                    <Button type="button" variant="secondary" >Cancel</Button>
                                    </DialogClose>
                                    <Button type="button" variant="destructive"onClick={()=>mutate(problem._id)}>Link</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">No results found.</p>
            )}
          </div>
        ):'No Data Found' }
      </div>
    </div>
  );
};

export default ProblemSearch;
