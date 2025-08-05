import { useEffect, useState } from "react"

const fakeData = [
  {id:"qewr",alias:"Pickle1",asphaltID:"u-132423",time:"66:34:56", link:"link1"},
  {id:"qewr2",alias:"Pickle2",asphaltID:"u-232425",time:"62:34:56", link:"link2"},
  {id:"qewr3",alias:"Pickle3",asphaltID:"u-332424",time:"63:34:56", link:"link3"},
  {id:"qewr4",alias:"SpeedDemon",asphaltID:"u-432426",time:"58:12:34", link:"link4"},
  {id:"qewr5",alias:"RoadWarrior",asphaltID:"u-532427",time:"59:45:21", link:"link5"},
  {id:"qewr6",alias:"AsphaltQueen",asphaltID:"u-632428",time:"61:23:45", link:"link6"},
]

export const Leaderboard = () => {
  const [serverData, setServerData] = useState<typeof fakeData>([])
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setServerData(fakeData.sort((a, b) => a.time.localeCompare(b.time)))
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
          Asphalt Leaderboard
        </h2>
        <p className="text-gray-400">Top performers this season</p>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Alias
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Asphalt ID
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Proof
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {serverData.map((data, index) => (
              <tr 
                key={data.id} 
                className={`transition-all duration-200 hover:bg-gray-800 ${index < 3 ? "bg-opacity-60" : ""} ${
                  index === 0 ? "bg-gradient-to-r from-amber-900/20 to-transparent" : 
                  index === 1 ? "bg-gradient-to-r from-gray-700/20 to-transparent" : 
                  index === 2 ? "bg-gradient-to-r from-amber-800/20 to-transparent" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    index === 0 ? "bg-amber-500 text-gray-900" : 
                    index === 1 ? "bg-gray-400 text-gray-900" : 
                    index === 2 ? "bg-amber-700 text-white" : "bg-gray-700 text-gray-300"
                  }`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && (
                      <svg className="w-5 h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`font-mono ${
                      index === 0 ? "text-amber-400 font-bold text-lg" : 
                      index === 1 ? "text-gray-300 font-semibold" : 
                      index === 2 ? "text-amber-300" : "text-gray-400"
                    }`}>
                      {data.time}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-300 font-medium">
                          {data.alias.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{data.alias}</div>
                      <div className="text-xs text-gray-400">Season {Math.floor(Math.random() * 10) + 1} player</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  {data.asphaltID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a 
                    href={data.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Updated {new Date().toLocaleString()} • Next update in 2h 15m</p>
      </div>
    </div>
  );
}