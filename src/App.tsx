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
import AddNewRecord from './root/dashboard/addNewRecord';
import ManageItems from './root/dashboard/manageItems';
import { ItemLists } from './apis/data';
import UserProfile from './root/userprofile';

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
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/type/:type',
            element: <DashboardItemTypes ItemActionType='' />
          }
        ]
      },
      {
        path: '/add-new-record',
        element: <AddNewRecord />
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
