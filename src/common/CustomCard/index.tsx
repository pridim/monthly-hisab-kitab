import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFormattedDate } from '../../utils';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent sx={{backgroundColor: 'lightgreen'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Start at: {getFormattedDate(new Date())}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        Total: 70 Ltr.
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        (till date)
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="large" sx={{justifyContent: 'center'}}>Add Today</Button>
    </CardActions>
  </React.Fragment>
);

export default function CustomCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
