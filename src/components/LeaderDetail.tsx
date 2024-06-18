import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Leader } from "../types/leader";
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

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
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = `${apiUrl}/leaders/${leader.id}`;
    // console.log(formData.get("name"));
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ name: formData.get("name") }),
      });

      if (!response.ok)
        throw new Error("Request failed:" + response.statusText);

      const data = await response.json();
      addMessage(`Leader ${leader.name} updated to ${data.name}`);
      setLeader(data);
    } catch (error) {
      console.log(error);
      addMessage("Failed to update leader");
    }
  };

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
        <form onSubmit={onSubmit}>
          <label>Leader Name</label>
          <div className="flex gap-3">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="border border-gray-300 rounded-xl p-2 w-1/4"
              // iniatial state e je naam ta ase Zego, sheita show korbe. Initially empty hoile empty show korbe.
              defaultValue={leader.name}
              // onChange={handleNameChange}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
