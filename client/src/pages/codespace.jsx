import React, { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

const CodeSpace = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initializeWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
      
        if (stompClient.connected) { 
          stompClient.subscribe("/codespace/codeupdate", (response) => {
            setMessage(response.body); 
          });
        }
      });
    };

    initializeWebSocket();

    return () => {
      if (stompClient && stompClient.connected) { 
        stompClient.disconnect();
      }
    };
  }, []);

  function sendMessage(text) {
    if (stompClient) { 
      stompClient.send("/app/userinput", {}, text);
    } else {
      console.log("Connection is not established or stompClient is not initialized. Cannot send the message.");
    }
  }

  const handleInputMessageChange = (e) => {
    sendMessage(e.target.value);
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={handleInputMessageChange}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default CodeSpace;
