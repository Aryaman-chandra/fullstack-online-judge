import { getContests } from '@/lib/api'
import { navigate } from '@/lib/navigation'
import { Loader } from '@/lib/utils/loader'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ContestList = () => {
    const fetchContests =async ()=>{
        const data = await getContests();
        return data;
    }
    const { data , isFetching } = useQuery({
        queryKey: ["contests"],
        queryFn: fetchContests
    })
    if(isFetching) return <Loader isLoading={isFetching}/>
    else
  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans  text-white">
  
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-primary">Ongoing Contests</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.ongoing.map((contest) => (
        <div key={contest._id} className="bg-rose-600 text-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:-translate-y-1 border-2 border-rose-400">
          <h3 className="text-xl font-semibold mb-2" onClick={()=>navigate(`contests/${contest._id}`)}>{contest.title}</h3>
          <p className="text-rose-200">Ends: {new Date(contest.end_time).toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-rose-500">Upcoming Contests</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.upcoming.map((contest) => (
        <div key={contest._id} className="bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-200 hover:-translate-y-1 border border-rose-300">
          <h3 className="text-xl font-semibold text-rose-300 mb-2" onClick={()=>navigate(`contests/${contest._id}`)}>{contest.title}</h3>
          <p className="text-gray-300">Starts: {new Date(contest.start_time).toDateString()}</p>
        </div>
      ))}
    </div>
  </div>

  <div>
    <h2 className="text-2xl font-semibold mb-4 text-rose-500">Previous Contests</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.past.map((contest) => (
        <div key={contest._id} className="bg-gray-900 rounded-lg shadow-md p-6 transition-transform duration-200 hover:-translate-y-1 border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-300" onClick={()=>navigate(`contests/${contest._id}`)}>{contest.title}</h3>
          <p className="text-gray-400">Ended: {new Date(contest.end_time).toDateString()}</p>
        </div>
      ))}
    </div>
  </div>

</div>
  )
}

export default ContestList
