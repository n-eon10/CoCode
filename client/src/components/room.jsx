import React from "react";
import { useNavigate } from "react-router-dom";

const Room = ({room}) => {

  const navigate = useNavigate();

  const joinRoom = async () => {
    const response = await fetch("http://localhost:8080/api/rooms/joinroom", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "roomName": `${room.roomName}`,
        "roomPasscode": `${room.roomPasscode}`
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
      <button onClick={joinRoom}> Join Room </button>
    </div>
  )
}

export default Room;