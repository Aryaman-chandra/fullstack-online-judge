import React from 'react'
import ForceGraph from './ForceGraph'
import { navigate } from '@/lib/navigation'

const HomePage = () => {
  return (
    <div className= 'grid grid-cols-4 grid-rows-4 h-full w-full gap-1 p-6'>
      <div className='col-span-2 row-span-4'><ForceGraph/></div>
        <StatsCard title="Problems Solved" value="42" icon="🏆" />
        <StatsCard title="Submissions" value="128" icon="📊" onClick={()=>navigate("home/submissions")}/>
    </div>
  )
}
const StatsCard = ({ title, value, icon , onClick=()=>{}}) => {
  return (
    <div className='col-span-2 row-span-2 bg-zinc-900 rounded-xl p-6 shadow-lg ' onClick={()=> onClick()}>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-primary'>{title}</h2>
        <span className='text-4xl'>{icon}</span>
      </div>
      <div className='flex justify-center items-center'>
        <div className='relative w-48 h-48'>
          <svg className='w-full h-full' viewBox='0 0 100 100'>
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='url(#circleGradient)'
              strokeWidth='10'
            />
          </svg>
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            <span className='text-4xl font-bold text-primary'>{value}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
