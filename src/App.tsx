import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './landingpage';
import './App.css';
import Root from './root';
import MemberTypes from './root/membertypes';
import UserRegistration from './root/registration';
import Dashboard from './root/dashboard';
import UserLogin from './root/login';
import DashboardItemTypes from './root/dashboard/dashboardItemTypes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/member-types',
        element: <MemberTypes />
      },
      {
        path: '/registration/:userType',
        element: <UserRegistration />
      },
      {
        path: '/login',
        element: <UserLogin />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/type/:type',
        element: <DashboardItemTypes />
      }
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
