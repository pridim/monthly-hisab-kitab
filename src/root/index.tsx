import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import ErrorBoundary from '../common/ErrorBoundary';

export default function Root() {

  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        <Box component="p" onClick={() => navigate(-1)}>Back</Box>
        <Box className="App">
          <Outlet />
        </Box>
      </Container>
    </ErrorBoundary>
  );
}