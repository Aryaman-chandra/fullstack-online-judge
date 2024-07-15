import { Button } from '@/components/ui/button';
import { deleteProblem, getAdminProblems } from '@/lib/api';
import { Loader } from '@/lib/utils/loader';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';

const MyProblems = () => {
    const queryClient = useQueryClient();
    const getMyProblems = async()=>{
        const data = await getAdminProblems();
        return data;
    }
    const { data , isPending ,isSuccess } = useQuery({
        queryKey : ["problems","admin"],
        queryFn : getMyProblems,
        initialData : {problems:[]}
    })

    const handleDelete =async  (problemId) => {
           const data = await deleteProblem({ p_id: problemId }); 
           return data
    }
    const mutate = useMutation({
        mutationFn: handleDelete,
        onSuccess: ()=>{ queryClient.invalidateQueries({ queryKey : ["problems","admin"] })}
    })

    const problems =  data.problems.map((problem)=>{
        console.log(problem);
        return (
            <li key={problem._id}>
                <div  className="p-4 my-2 bg-stone-900 text-rose-100 rounded-md hover:ring-2 hover:ring-rose-500 transition duration-300">
                    <div className='flex flex between mb-2'>
                        <h2 className="text-xl font-semibold ">{problem.title}</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type="button" variant="ghost" size="icon">
                                { (mutate.isPending)?<Loader isLoading={mutate.isPending}/>:<X className="h-4 w-4" />}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this problem? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                    <Button type="button" variant="secondary" onClick={() => {}}>Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                    <Button type="button" variant="destructive" onClick={() => mutate.mutate(problem._id)}>Delete</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-sm mb-4">Difficulty: {problem.difficulty}</p>
                </div>
            </li>
        )
    })

    if(isPending) return <Loader isLoading={isPending}/>

    return (
        <div className='flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-auto'>
            <ul>
                {problems}
            </ul>
        </div>
    )
}

export default MyProblems
