import { useState, useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { python } from "@codemirror/lang-python"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import CodeMirror from "@uiw/react-codemirror";

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

  const handleInputMessageChange = (value) => {
    sendMessage(value);
  };
  

  return (
    <div className="h-screen flex-row">
      <div className="flex float-right flex-col my-[1%] w-[45%] h-screen mx-[1%]"> 
        <CodeMirror
          value={message}
          theme={tokyoNight}
          extensions={[python()]}
          onChange={handleInputMessageChange}
          options={{
            viewportMargin: Infinity,
            lineWrapping: true,
            autoHeight: false,
          }}
          className="w-full text-left overflow-y-auto overflow-x-auto my-[1%] rounded-lg"
          height="100vh"
        />

        <div className=' bg-indigo-600 rounded-lg h-[5%]'>
          Submit Code
        </div>

      </div>

      <div className='flex float-right flex-col my-[1%] w-[45%] h-screen mx-[1%] bg-indigo-500 rounded-lg'>
        Question Info
      </div>
    </div>
  );
};

export default CodeSpace;
