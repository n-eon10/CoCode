import React, { useEffect, useState } from "react";
import Room from "../components/room";
import { useCreateRoom } from "../hooks/useCreateRoom";

const Rooms = () => {
  const createRoom  = useCreateRoom();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [showCreateRoom, setShowCreateNewRoom] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [roomType, setRoomType] = useState("Public");
  const [roomPasscode, setRoomPasscode] = useState(null);

  const handleCreateRoom = async () => {
    await createRoom(roomName, roomType, roomPasscode);
  }

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true); 
      const response = await fetch("http://localhost:8080/api/rooms/getall");

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setRooms(json);
      }
      setIsLoading(false); 
    }

    fetchRooms();

  }, []);

  const toggleShowCreateRoom = () => {
    setShowCreateNewRoom(!showCreateRoom);
  }
  
  return (
    <div className="flex flex-col items-center"> 
      <div className="flex flex-col bg-secondary p-4 rounded-lg text-left w-[50%] h-auto my-2">
        <button onClick={toggleShowCreateRoom} className=""> Create a New Room </button>
        {showCreateRoom && 
          <div className="flex flex-col"> 

            <label> Room Name </label>
            <input 
              placeholder="Room Name"
              className="text-center text-black"
              onChange={(e) => setRoomName(e.target.value)}
            />

            <label> Room Type </label>
            <select 
              className="text-center text-black"
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            {roomType.toLowerCase() === "private" && 
              <div className="flex flex-col">
                <label> Room Passcode </label>
                <input 
                placeholder="Room Passcode"
                className="text-center text-black"
                onChange={(e) => setRoomPasscode(e.target.value)}
                />
            </div>}
            <button onClick={handleCreateRoom}> Create Room </button>
          </div>}
      </div>

      {isLoading ? (
        <p>Searching for rooms...</p>
      ) : rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))
      ) : (
        <p>
          No rooms available 
        </p>
      )}

    </div>
  )
}

export default Rooms;
