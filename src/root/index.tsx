import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import ErrorBoundary from '../common/ErrorBoundary';
import ProfileMenuBar from './dashboard/appbar';
import { getLoggedInUserDetails } from '../utils';

export default function Root() {
  const user = getLoggedInUserDetails();
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        {user && 
          <Box width="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <ProfileMenuBar />
            <Box component="p" mb={0} onClick={() => navigate(-1)}>Back</Box>
          </Box>
        }
        <Box className="App">
          <Outlet />
        </Box>
      </Container>
    </ErrorBoundary>
  );
}