import "./App.css";

import { BrowserRouter,  Route , Routes} from 'react-router-dom';
import Games from "./components/games/GameList";
import GameDetail from "./components/games/GameDetail"
import CreateGame from "./components/games/CreateGame"
import Header from './components/Header'
import {GameContext}  from "./contexts/ContextProvider";
import Login from './components/users/Login';
import Register from './components/users/Register';
import { GameContextProvider } from "./contexts/ContextProvider";
function App() {


  return (

    <GameContextProvider>
      <div className="App">
          <BrowserRouter>
            <Header />
          <Routes>
             <Route path={"/"} element={<Games />} />
              <Route path={"/games"} element={<Games />} />
            <Route path={"/games/:id"} element={<GameDetail />} />
            
             <Route path={"/games/new"} element={<CreateGame />} />
              <Route path={"/games/:id/edit"} element={<CreateGame />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
            
            </Routes>
          </BrowserRouter>
          </div>
        </GameContextProvider>
  );
}

export default App;
