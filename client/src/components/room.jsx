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
    <div>
      <h1> {room.roomName} </h1>
      <h1> {room.roomUsers} </h1>
      <h1> {room.roomType} </h1>
      <button onClick={room.roomType === "Public" ? joinPublicRoom : joinPrivateRoom}> Join Room </button>
      {room.roomType === "Private" &&
        <input
          onChange = {(e) => setPasscode(e.target.value)}
          className="text-black"
        />
      }
    </div>
  )
}

export default Room;