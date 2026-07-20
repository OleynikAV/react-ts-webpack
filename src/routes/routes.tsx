import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import { profile } from '@routes/index';

export default function AppRoutes() {
   return (
      <Routes>
         <Route path={'/'} element={<App/>}>
            {profile.routes.map(({ title, path, element }) =>
               <Route key={title} index path={path} element={element}/>,
            )}
         </Route>
      </Routes>
   );
}
