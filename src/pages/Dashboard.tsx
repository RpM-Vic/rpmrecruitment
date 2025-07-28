import { useEffect, useState } from "react"

const fakeData=[
  {id:"qewr",alias:"Pickle1",asphaltID:"u-132423",time:"66:34:56", link:"link1"},
  {id:"qewr2",alias:"Pickle2",asphaltID:"u-232425",time:"62:34:56", link:"link2"},
  {id:"qewr3",alias:"Pickle1",asphaltID:"u-332424",time:"63:34:56", link:"link3"},
]

export const Dashboard = () => {
  const [serverData,setServerData]=useState<typeof fakeData>([])
  useEffect(()=>{
    setServerData(fakeData)
  },[])

  return (
    <div>
      <h2>This is the dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Alias</th>
            <th>Asphalt ID</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {serverData.map((data) => (
            <tr key={data.id} className="hover:bg-amber-50">
              <td>{data.time}</td>
              <td>{data.alias}</td>
              <td>{data.asphaltID}</td>
               <td>
                <a href={data.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-500"
                >{data.link}</a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
