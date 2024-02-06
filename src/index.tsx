import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import './firebase/Firebase';
import { Alerts } from './components/Alert/Alerts';
import { Loader } from './components/Loader/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
   <Provider store={store}>
      <React.StrictMode>
         <BrowserRouter>
            <AppRoutes/>
         </BrowserRouter>
         <Alerts/>
         <Loader/>
      </React.StrictMode>
   </Provider>
);
