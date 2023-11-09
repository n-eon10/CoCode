import React, { useEffect, useState } from "react";
import Room from "../components/room";

const Rooms = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:8080/api/rooms/getall");

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setRooms(json);
      }
    }

    fetchRooms();

  }, []);
  

  return (
    <div className="flex flex-col items-center"> 
      {rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <Room key={room._id} room={room} />
        ))
      ) : (
        <p>
          No rooms avaliable 
        </p>
      )}
    </div>
  )
}

export default Rooms;