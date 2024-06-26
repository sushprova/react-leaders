import React, { useEffect, useRef, useState } from "react";
import { Leader } from "../types/leader";
// import LeaderDetail from './LeaderDetail';
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function LeadersList() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  // const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);
  const fetched = useRef(false);
  const { addMessage } = useMessages();

  // const selectedLeader = leaders.find(
  //   // callback function returns true when it matches and leader gets the associated value of array
  //   (leader) => leader.id === selectedLeaderId
  // );

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/leaders`)
        .then((res: Response) => res.json())
        .then((data) => {
          setLeaders(data);
          addMessage("All leaders loaded");
        });
      fetched.current = true;
    }
  }, [addMessage]);

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
  async function deleteLeader(leader: Leader) {
    try {
      const response = await fetch(`${apiUrl}/leaders/${leader.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Request failed" + response.statusText);

      setLeaders((prevLeaders) =>
        prevLeaders.filter((l) => l.id !== leader.id)
      );
      addMessage(`Leader ${leader.name} deleted.`);
    } catch (error) {
      console.log(error);
      addMessage("Failed to delete leader.");
    }
  }
  return (
    <div className="ml-4">
      <div className="flex gap-3">
        <h2 className="text-2xl">My Leaders</h2>
        <Link to="/leaders/create" className="btn">
          {" "}
          Create new
        </Link>
      </div>
      <ul className="flex flex-col gap-2 my-2">
        {leaders.map((leader) => (
          // keys are necessary to identify each element otherwise it will have to
          // re render the whole list everytime there is a change
          <Link
            to={`/leaders/${leader.id}`}
            key={leader.id}
            className="flex cursor-pointer"
            // onClick={() => handleSelectedLeader(leader.id)}
          >
            <span className="bg-slate-500 text-white rounded-md p-1.5 m-1">
              {leader.id}
            </span>
            <div className="bg-slate-200 rounded-md p-1.5 w-full flex justify-between">
              <span>{leader.name}</span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  deleteLeader(leader);
                }}
                className="bg-white px-1 cursor-pointer"
              >
                X
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
