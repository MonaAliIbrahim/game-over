import { createBrowserRouter } from "react-router-dom";
import MasterLayout from './MasterLayout/MasterLayout';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import Home from "./Components/Home/Home";
import All from "./Components/All/All";
import Games from './Components/Games/Games';
import GameDetails from './Components/GameDetails/GameDetails';
import NotFound from './Components/NotFound/NotFound';

const routes = createBrowserRouter([
  { path: '', element: <MasterLayout/>, children: [
      { index: true, element: <Home/>},
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      { path: 'all', element: <All/> },       
      { path: 'games/:type/:name', element: <Games/>},
      { path: 'game-details/:id', element: <GameDetails/>},
      { path: '*', element: <NotFound/>}
    ]
  },
  { path: '*', element: <MasterLayout/>}
])

export default routes;