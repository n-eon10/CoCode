import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Room = ({room}) => {

  const navigate = useNavigate();
  const [passcode, setPasscode] = useState(null);

  const joinPublicRoom = async () => {
    const response = await fetch("http://localhost:8080/api/rooms/joinroom", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "roomName": `${room.roomName}`,
      })
    });

    if (response.ok) {
      navigate(`/codespace/${room.id}`);
    }
  } 

  const joinPrivateRoom = async () => {
    const response = await fetch("http://localhost:8080/api/rooms/joinroom", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "roomName": `${room.roomName}`,
        "roomPasscode": `${passcode}`
      })
    });

    if (response.ok) {
      navigate(`/codespace/${room.id}`);
    }

  }

  return (
    <div className="flex flex-col bg-secondary p-4 rounded-lg text-left w-[50%] h-auto my-2">
      <h1> Room Name: {room.roomName} </h1>
      <h1>  {room.roomUsers} </h1>
      <h1> Room Type: {room.roomType} </h1>
      
      {room.roomType === "Private" &&
        <input
          onChange = {(e) => setPasscode(e.target.value)}
          className="text-black text-center"
          placeholder="Enter the passcode for this room"
        />
      }
      <button onClick={room.roomType === "Public" ? joinPublicRoom : joinPrivateRoom}> Join Room </button>
    </div>
  )
}

export default Room;