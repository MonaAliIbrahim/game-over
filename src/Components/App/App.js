import './App.scss';
import { RouterProvider } from 'react-router-dom';
import routes from '../../routes';
import { Provider } from 'react-redux';
import Store from '../../Shared/Services/Store/index';

function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={routes}/>
    </Provider>
  );
}

export default App;
