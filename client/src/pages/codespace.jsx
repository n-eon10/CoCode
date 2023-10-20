import React, { useState } from 'react';
import { useWebSocketConnection } from '../hooks/usewsconnection.jsx';
import { python } from "@codemirror/lang-python";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";

const CodeSpace = () => {
  const [message, setMessage] = useState("");
  
  const stompClient = useWebSocketConnection(
    "http://localhost:8080/ws",
    "/codespace/codeupdate",
    setMessage
  );

  const sendMessage = (msg) => {
    if (stompClient) {
      stompClient.send("/app/userinput", {}, msg);
    }
  };

  const handleInputMessageChange = (value) => {
    sendMessage(value);
  };

  return (
    <div className="h-screen">
      <div className="flex float-right flex-col my-[1%] w-[48%] h-screen mx-[1%]"> 
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

        <div className=' bg-primary rounded-lg h-[5%]'>
          Submit Code
        </div>

      </div>

      <div className='flex float-right flex-col my-[1%] w-[48%] h-screen mx-[1%] bg-primary rounded-lg text-left'>
        <h1 className="mx-[3%] my-[2%] text-bold text-lg"> Two Sum </h1>

        <p className='mx-[3%] my-[2%]'>
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

          You may assume that each input would have exactly one solution, and you may not use the same element twice.

          You can return the answer in any order.
        </p>

        <p className='mx-[3%] my-[2%]'>
          Example 1:
          <br></br>
          Input: nums = [2,7,11,15], target = 9
          <br></br>
          Output: [0,1]
          <br></br>
          Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
        </p> 

        <p className='mx-[3%] my-[2%]'>
          Example 2:
          <br></br>
          Input: nums = [3,2,4], target = 6
          <br></br>
          Output: [1,2]
        </p>

        <p className='mx-[3%] my-[2%]'>
          Example 3:
          <br></br>
          Input: nums = [3,3], target = 6
          <br></br>
          Output: [0,1]
        </p>
      </div>
    </div>
  );
};

export default CodeSpace;
