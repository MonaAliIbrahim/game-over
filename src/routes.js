import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MasterLayout from './MasterLayout/MasterLayout';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
const Home = React.lazy(() => import("./Components/Home/Home"));
const All = React.lazy(() => import("./Components/All/All"));
const Games = React.lazy(() => import("./Components/Games/Games"));
const GameDetails = React.lazy(() => import("./Components/GameDetails/GameDetails"));

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
]
, { basename: '/game-over' })

export default routes;