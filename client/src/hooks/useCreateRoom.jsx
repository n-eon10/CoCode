import { useNavigate } from "react-router-dom";

export const useCreateRoom = () => {

  const navigate = useNavigate();

  const createRoom = async (roomName, roomType, roomPasscode) => {
    const response = await fetch("http://localhost:8080/api/rooms/createroom", {
      method: "POST",
      body: JSON.stringify({
        "roomName": `${roomName}`,
        "roomType": `${roomType}`,
        "roomPasscode": `${roomPasscode}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await response.json();

    if (response.ok) {
      navigate(`/codespace/${json.room.id}`);

    }

    return json;
  }
  return createRoom;
}

