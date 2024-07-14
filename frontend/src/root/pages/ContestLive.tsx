import React from 'react';
import { CountdownTimer } from './ContestDescriptionPage';
import { useNavigate } from 'react-router-dom';

const ContestLive = ({ contest }) => {
  const navigate = useNavigate();

  const getProblemLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  const handleClick = (p_id) => {
    navigate(`/problems/${p_id}`, { state: { p_id: p_id } });
  };

  return (
    <div className="container mx-auto p-4 text-cyan-300 min-h-screen">
      <div className="mb-8 p-4 bg-black bg-opacity-30 rounded-lg shadow-lg shadow-cyan-500/30">
        <CountdownTimer startTime={contest.end_time} />
      </div>
      <div className="mt-6">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center neon-text">Problems</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-black bg-opacity-40 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyan-900 bg-opacity-30">
                <th className="py-3 px-6 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">#</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Title</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {contest.problems.map((problem, index) => (
                <tr key={problem._id} className="hover:bg-cyan-900 hover:bg-opacity-20 transition-colors duration-200">
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-cyan-400">
                    {getProblemLetter(index)}
                  </td>
                  <td 
                    className="py-4 px-6 whitespace-nowrap text-sm cursor-pointer hover:text-cyan-200 transition-colors duration-200"
                    onClick={() => handleClick(problem._id)}
                  >
                    {problem.title}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-green-500 bg-opacity-20 text-green-300' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-300' :
                      'bg-red-500 bg-opacity-20 text-red-300'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestLive;
