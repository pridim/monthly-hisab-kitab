import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import ErrorBoundary from '../common/ErrorBoundary';
import ProfileMenuBar from './dashboard/appbar';
import { getLoggedInUserDetails } from '../utils';

export default function Root() {
  const user = getLoggedInUserDetails();
  return (
    <ErrorBoundary>
      {user && 
        <ProfileMenuBar />
      }
      <Container maxWidth="sm" sx={{marginTop: '.5rem'}}>
        <Box className="App">
          <Outlet />
        </Box>
      </Container>
    </ErrorBoundary>
  );
}