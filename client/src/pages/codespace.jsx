import React, { useState } from 'react';
import { useWebSocketConnection } from '../hooks/usewsconnection.jsx';
import { python } from "@codemirror/lang-python"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import CodeMirror from "@uiw/react-codemirror";

const CodeSpace = () => {
  const [message, setMessage] = useState("");
  
  const stompClient = useWebSocketConnection(
    "http://localhost:8080/ws",
    "/codespace/codeupdate",
    setMessage
  );

  // Function to send message
  const sendMessage = (msg) => {
    if (stompClient) {
      stompClient.send("/app/userinput", {}, msg);
    }
  };

  const handleInputMessageChange = (value) => {
    sendMessage(value);
  };

  // Rest of your component
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
