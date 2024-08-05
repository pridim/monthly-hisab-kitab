import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function CustomPaper(props: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: '0px 1rem 1rem 1rem',
        },
      }}
    >
      <Paper elevation={3} sx={{width: '100%'}}>{props.children}</Paper>
    </Box>
  );
}