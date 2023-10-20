import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Landing from './pages/landing';
import CodeSpace from './pages/codespace';
import { NavBar } from './components/navbar';
import SignUp from './pages/signup';
import SignIn from './pages/signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className='pages'>
          <Routes>
            <Route
              path = "/"
              element = {<Landing/>}
            />

            <Route 
              path = "/signup"
              element = {<SignUp/>}
            />

            <Route  
              path = "/signin"
              element = {<SignIn/>}
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
