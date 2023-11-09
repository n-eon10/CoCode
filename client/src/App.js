import './App.css';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Landing from './pages/landing';
import CodeSpace from './pages/codespace';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Rooms from './pages/rooms';
import NavBar from './components/navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>

        <NavBar/>
        
        <div className='pages'>
          <Routes>
            <Route
              path = "/"
              element = {!user ? <Landing/> : <Navigate to = "/rooms" />}
            />

            <Route 
              path = "/signup"
              element = {!user ? <SignUp/> : <Navigate to = "/rooms" />}
            />

            <Route  
              path = "/signin"
              element = {!user ? <SignIn/> : <Navigate to = "/rooms" />}
            />

            <Route
              path = "/codespace/:roomId"
              element = {user ? <CodeSpace/> : <Navigate to = "/" />}
            />

            <Route 
              path = "/rooms"
              element = {user ? <Rooms /> : <Navigate to = "/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
