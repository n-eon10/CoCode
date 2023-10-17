import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Landing from './pages/landing';
import CodeSpace from './pages/codespace';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path = "/"
              element = {<Landing/>}
            />

            <Route
              path = "/codespace"
              element = {<CodeSpace/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
