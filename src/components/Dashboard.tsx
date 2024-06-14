import React, { useEffect, useRef, useState } from 'react'
import { Leader } from '../types/leader';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const [leaders, setLeaders] = useState<Leader[]>([]);

  const fetched = useRef(false) ;

  useEffect(() => {
    if (!fetched.current){
    fetch('http://localhost:3000/leaders?_limit=4')
    .then((res: Response) => res.json())
    .then(data => {setLeaders(data)});
    fetched.current = true;
    }
  }, [])
  
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-2xl'>Top Leaders</h2>
      <div className='flex gap-3'>
      {leaders.map(leader => (
       <Link key={leader.id} to={`/leaders/${leader.id}`} 
       className='p-4 bg-slate-700 text-white rounded-lg cursor-pointer'>
       {leader.name}
       </Link>  
      ))}
      </div>
    </div>
  )
}
