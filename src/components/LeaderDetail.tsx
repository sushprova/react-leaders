import React, { useEffect, useRef, useState } from "react";
import { Leader } from "../types/leader";
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";
import LeaderForm from "./LeaderForm";

const apiUrl = import.meta.env.VITE_API_URL;
// type Props ={
//   // ? means optional
//     leader?:Leader;
//     onChangeName?: (event: ChangeEvent<HTMLInputElement>) => void;
// }
// export default function LeaderDetail(props:Props) { korle props.leader.id
export default function LeaderDetail() {
  const [leader, setLeader] = useState<Leader | null>(null);
  const params = useParams();
  const fetched = useRef(false);
  const { addMessage } = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/leaders/${params.id}`)
        .then((res: Response) => res.json())
        .then((data) => {
          setLeader(data);
          addMessage(`Leader ${data.name} loaded`);
        });
      fetched.current = true;
    }
  }, [params.id, addMessage]);

  if (!leader) return null;

  // controlled input cause tracks the change
  // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setLeader({ ...leader, name: event.target.value });
  // };

  // uncontrolled input

  return (
    <div className="mt-3">
      <h2 className="text-2xl">{leader ? "Edit Leader" : "Create Leader"}</h2>
      <div>
        <span className="font-bold">ID:</span>
        {leader.id}
      </div>
      <div className="space-x-2">
        <span className="font-bold">Name:</span>
        <span className="uppercase">{leader.name}</span>
      </div>

      <div className="flex flex-col gap-2 mt-3 border-t">
        <LeaderForm leader={leader} setLeader={setLeader} />
      </div>
    </div>
  );
}
