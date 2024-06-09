import React, { ChangeEvent } from 'react'
import { Leader } from '../types/leader'

type Props ={
  // ? means optional
    leader?:Leader;
    onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
}
// export default function LeaderDetail(props:Props) { korle props.leader.id 
export default function LeaderDetail({leader, onChangeName}:Props) {

if (!leader) return null;  
  return (
<>
          <h2 className="text-2xl">Details</h2>
          <div>
            <span className="font-bold">ID:</span>
            {leader.id}
          </div>
          <div className="space-x-2">
            <span className="font-bold">Name:</span>
            <span className="uppercase">{leader.name}</span>
          </div>

          <div className="flex flex-col gap-2 mt-3 border-t">
            <label>Leader Name</label>
            <input
              type="text"
              placeholder="name"
              className="border border-gray-300 rounded-xl p-2 w-1/4"
              // iniatial state e je naam ta ase Zego, sheita show korbe. Initially empty hoile empty show korbe.
              value={leader.name}
              onChange={onChangeName}
            />
          </div>
        </>  )
}
