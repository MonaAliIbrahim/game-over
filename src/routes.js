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
      { index: true, element: <Home/> },
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      { path: 'all', element: <All/> },       
      { path: 'games/platform/:id', exact: true, element: <Games/>},
      { path: 'games/sort/:id', exact: true, element: <Games/>},
      { path: 'games/category/:id', exact: true, element: <Games/>},
      { path: 'game-details/:id', element: <GameDetails/>},
      { path: '*', element: <Home/> }
    ]
  },
  { path: '*', element: <NotFound/> }
])

export default routes;