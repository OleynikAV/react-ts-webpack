import React from 'react';
import Home from '@pages/Home/home';
import News from '@pages/News/news';
import { ROUTES } from './constants';
import Page404 from '@pages/Page404/page404';

export const profile = {
   name: 'profile',
   routes: [
      {
         title: 'Home',
         path: ROUTES.HOME,
         element: <Home/>,
      },
      {
         title: 'News',
         path: ROUTES.NEWS,
         element: <News/>,
      },
      {
         title: '404',
         path: ROUTES.PAGENOTFOUND,
         element: <Page404/>,
      },
   ],
};
