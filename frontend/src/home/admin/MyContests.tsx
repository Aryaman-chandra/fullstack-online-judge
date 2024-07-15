import { Button } from '@/components/ui/button';
import { deleteProblem, getAdminContests, getAdminProblems } from '@/lib/api';
import { Loader } from '@/lib/utils/loader';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
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

const MyContests = () => {
    const getMyContests = async()=>{
        const data = await getAdminContests();
        return data;
    }
    const { data , isPending ,isSuccess } = useQuery({
        queryKey : ["contests","admin"],
        queryFn : getMyContests,
        initialData : {contests:[]}
    })

    const handleDelete =async  (contestId) => {
           const data = await deleteProblem({ c_id: contestId }); 
           return data
    }
    const mutate = useMutation({
        mutationFn: handleDelete
    })

    const contests =  data.contests.map((contest)=>{
        console.log(contest);
        return (
            <li key={contest._id}>
                <div  className="p-4 my-2 bg-stone-900 text-rose-100 rounded-md hover:ring-2 hover:ring-rose-500 transition duration-300">
                    <div className='flex flex between mb-2'>
                        <h2 className="text-xl font-semibold ">{contest.title}</h2>
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
                                        Are you sure you want to delete this contest? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => {}}>Cancel</Button>
                                    <Button type="button" variant="destructive" onClick={() => mutate.mutate(contest._id)}>Delete</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-sm mb-4">Difficulty: {contest.difficulty}</p>
                </div>
            </li>
        )
    })

    if(isPending) return <Loader isLoading={isPending}/>

    return (
        <div className='flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-auto'>
            <ul>
                {contests}
            </ul>
        </div>
    )
}

export default MyContests
