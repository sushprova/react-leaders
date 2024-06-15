import React, { useEffect, useRef, useState } from 'react'
import { Leader } from '../types/leader';
// import LeaderDetail from './LeaderDetail';
import { Link } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL

export default function LeadersList() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  // const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);
  const fetched = useRef(false) ;

  // const selectedLeader = leaders.find(
  //   // callback function returns true when it matches and leader gets the associated value of array
  //   (leader) => leader.id === selectedLeaderId
  // );

  useEffect(() => {
    if (!fetched.current){
    fetch(`${apiUrl}/leaders`)
    .then((res: Response) => res.json())
    .then(data => {setLeaders(data)});
    fetched.current = true;
    }
  }, [])

  //an arrow function that takes id which is a number and updates the
  //state variable, this whole thing is a const variable named handleSelectedLeader
  // const handleSelectedLeader = (id: number) => {
  //   setSelectedLeaderId(id);
  // };

  // // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  // //   // setLeader({...leader, name: event.target.value})
  // //   const updatedName = event.target.value;

  //   setLeaders((prevLeaders) =>
  //     prevLeaders.map((leader) => {
  //       if (leader.id === selectedLeaderId) {
  //         return { ...leader, name: updatedName };
  //       }
  //       return leader;
  //     })
  //   );
  // };

  return (
    <div >
      <h2 className="text-2xl">My Leaders</h2>
      <ul className="flex flex-col gap-2 my-2">
        {leaders.map((leader) => (
          // keys are necessary to identify each element otherwise it will have to
          // re render the whole list everytime there is a change
          <Link to={`/leaders/${leader.id}`} 
            key={leader.id}
            className="flex cursor-pointer"
            // onClick={() => handleSelectedLeader(leader.id)} 
          >
            <span className="bg-slate-500 text-white rounded-md p-1.5 m-1">
              {leader.id}
            </span>
            <span className="bg-slate-200 rounded-md p-1.5 w-full m-1">
              {leader.name}
            </span>
          </Link>
        ))}
      </ul>

    </div>
  );
}
