import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserRegistration() {
    const [user, setUser] = React.useState({
        username: '',
        phone: ''
    })

    const navigate = useNavigate();
    const params = useParams();
    const { userType } = params;
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        localStorage.setItem('userData', JSON.stringify({ user, userType }))
        navigate('/dashboard')
    }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', textAlign: 'left'},
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <Box component="h4">Enter your name:</Box>
        <TextField
            name="username" variant="outlined"
            placeholder='Enter name' value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})} 
        />
        <Box component="h4">Enter phone:</Box>
        <TextField
            name="phone" variant="outlined"
            placeholder='Enter phone' value={user.phone} 
            onChange={(e) => setUser({...user, phone: e.target.value})} 
        />
        <Button color='primary' type="submit" variant='contained' style={{width: '100%'}}>Submit</Button>
    </Box>
  );
}