import React, { useEffect, useState } from 'react';
import { useWebSocketConnection } from '../hooks/usewsconnection.jsx';
import { python } from "@codemirror/lang-python";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";

const CodeSpace = () => {
  const [code, setCode] = useState("");
  const [pyodide, setPyodide]  = useState(null);
  const stompClient = useWebSocketConnection(
    "http://localhost:8080/ws",
    "/codespace/codeupdate",
    setCode
  );

  useEffect(() => {
    (async function() {
      if (!pyodide) {
        setPyodide(await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
        }))
      }
    })();
  }, [pyodide]);

  const sendCode = (code) => {
    if (stompClient) {
      stompClient.send("/app/userinput", {}, code);
    }
  };

  const handleCodeChange = (code) => {
    sendCode(code);
  };

  return (
    <div className="h-screen">
      <div className="flex float-right flex-col my-[1%] w-[48%] h-screen mx-[1%]"> 
        <CodeMirror
          value={code}
          theme={tokyoNight}
          extensions={[python()]}
          onChange={handleCodeChange}
          options={{
            viewportMargin: Infinity,
            lineWrapping: true,
            autoHeight: false,
          }}
          className="w-full text-left overflow-y-auto overflow-x-auto my-[1%] rounded-lg"
          height="100vh"
        />

        <button className=' bg-primary rounded-lg h-[5%]' onClick = {() => {if (pyodide) {console.log(pyodide.runPython(code))}}}>
          Submit Code
        </button>

      </div>

      <div className='flex float-right flex-col my-[1%] w-[48%] h-screen mx-[1%] bg-primary rounded-lg text-left'>
      </div>
    </div>
  );
};

export default CodeSpace;
