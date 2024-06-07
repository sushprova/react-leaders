import { useState, ChangeEvent } from "react";
import { Leader } from "./types/leader";
import { LEADERS } from "./data/mock-leaders";

export default function App() {
  const [leaders, setLeaders] = useState<Leader[]>(LEADERS);
  const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);

  const selectedLeader = leaders.find(
    (leader) => leader.id === selectedLeaderId
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setLeader({...leader, name: event.target.value})
    const updatedName = event.target.value;

    setLeaders((prevLeaders) =>
      prevLeaders.map((leader) => {
        if (leader.id === selectedLeaderId) {
          return { ...leader, name: updatedName };
        }
        return leader;
      })
    );
  };
  //an arrow function that takes id which is a number and updates the
  //state variable, this whole thing is a const variable named handleSelectedLeader
  const handleSelectedLeader = (id: number) => {
    setSelectedLeaderId(id);
  };

  return (
    <div className="container  mt-5 mx-auto">
      <h2 className="text-2xl">My Leaders</h2>
      <ul className="flex flex-col gap-2 my-2">
        {leaders.map((leader) => (
          // keys are necessary to identify each element otherwise it will have to
          // re render the whole list everytime there is a change
          <li
            key={leader.id}
            className="flex cursor-pointer"
            onClick={() => handleSelectedLeader(leader.id)}
          >
            <span className="bg-slate-500 text-white rounded-md p-1.5 m-1">
              {leader.id}
            </span>
            <span className="bg-slate-200 rounded-md p-1.5 w-1/4 m-1">
              {leader.name}
            </span>
          </li>
        ))}
      </ul>

      {selectedLeader && (
        <>
          <h2 className="text-2xl">Details</h2>
          <div>
            <span className="font-bold">ID:</span>
            {selectedLeader.id}
          </div>
          <div className="space-x-2">
            <span className="font-bold">Name:</span>
            <span className="uppercase">{selectedLeader.name}</span>
          </div>

          <div className="flex flex-col gap-2 mt-3 border-t">
            <label>Leader Name</label>
            <input
              type="text"
              placeholder="name"
              className="border border-gray-300 rounded-xl p-2 w-1/4"
              // iniatial state e je naam ta ase Zego, sheita show korbe. Initially empty hoile empty show korbe.
              value={selectedLeader.name}
              onChange={handleNameChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
