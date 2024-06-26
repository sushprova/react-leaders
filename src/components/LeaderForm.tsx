import React, { FormEvent } from "react";
import { Leader } from "../types/leader";
import { useMessages } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";

type Props = {
  leader?: Leader;
  setLeader?: (leader: Leader) => void;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function LeaderForm({ leader, setLeader }: Props) {
  const { addMessage } = useMessages();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = leader ? `${apiUrl}/leaders/${leader.id}` : `${apiUrl}/leaders`;
    const method = leader ? "PUT" : "POST";
    // console.log(formData.get("name"));
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({ name: formData.get("name") }),
      });

      if (!response.ok)
        throw new Error("Request failed:" + response.statusText);

      const data = await response.json();
      const message = leader
        ? `Leader ${leader.name} updated to ${data.name}`
        : `Leader ${data.name} created.`;
      addMessage(message);
      leader && setLeader ? setLeader(data) : navigate(`/leaders/${data.id}`);
    } catch (error) {
      console.log(error);
      addMessage("Failed to update leader");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Leader Name</label>
      <div className="flex gap-3">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="border border-gray-300 rounded-xl p-2 w-1/4"
          // iniatial state e je naam ta ase Zego, sheita show korbe. Initially empty hoile empty show korbe.
          defaultValue={leader?.name || ""}
          // onChange={handleNameChange}
        />
        <button type="submit" className="btn">
          {leader ? "Edit" : "Create"}
        </button>
      </div>
    </form>
  );
}
