import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContest } from '@/lib/api';
import { Loader } from '@/lib/utils/loader';

export const CountdownTimer = ({ startTime}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(startTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="mx-2" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-2xl text-zinc-400 font-bold mt-4">
      {timerComponents.length ? timerComponents :<span>Contest has ended!</span>}
    </div>
  );
};

const ContestDescriptionPage = ({ contestId }) => {
  const { data , isLoading, error } = useQuery({
    queryKey: ['contest', contestId],
    queryFn: () => getContest(contestId),
  });

  if (isLoading) return <Loader isLoading={isLoading}/>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
  <div className="min-h-screen bg-black text-rose-100 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-rose-500 mb-6 shadow-rose-500/50 shadow-sm">{data.contest.title}</h1>
      
      <div className="bg-rose-900 bg-opacity-20 border border-rose-800 rounded-lg p-6 mb-8 shadow-lg shadow-rose-700/30">
        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Contest has not begun</h2>
        <CountdownTimer startTime={data.contest.start_time} />
      </div>
      <div className="space-y-6">
        <div className="bg-indigo-950 bg-opacity-30 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-indigo-300 mb-2">Description</h3>
          <p className="text-rose-200">{ data.contest.description}</p>
        </div>
        <div className="flex justify-between text-rose-300 bg-emerald-950 bg-opacity-30 rounded-lg p-4">
          <div>
            <h3 className="text-xl font-semibold text-emerald-300 mb-2">Start Time</h3>
            <p className="text-emerald-200">{new Date(data.contest.start_time).toDateString()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-emerald-300 mb-2">End Time</h3>
            <p className="text-emerald-200">{new Date(data.contest.end_time).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ContestDescriptionPage;
