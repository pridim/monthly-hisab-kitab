import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { UserItemType } from '../registration';
import { getLoggedInUserDetails } from '../../utils';

export default function UserLogin() {
  const [phone, setPhone] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const navigate = useNavigate();

  React.useEffect(() => {
    const loggedInUser = getLoggedInUserDetails();
    if(loggedInUser) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const users = localStorage.getItem('users')
    if(!users) {
        setErrorMsg("Please register, user doesn't exist")
        return
    } else {
        const userList = JSON.parse(users);
        const userFound = userList.filter((userItem: UserItemType) => userItem.user.phone === phone)
        if(userFound.length) {
            localStorage.setItem('loggedInUser', JSON.stringify(userFound[0]))
            navigate('/dashboard')
        } else {
            setErrorMsg("Please register, user doesn't exist")
        }
    }
  }

  return <>
    <Box component="h2" textAlign="center">Login</Box>
    { errorMsg && 
        <Stack spacing={1}>
            <Alert severity="error">{errorMsg}</Alert>
        </Stack>
    }
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', textAlign: 'left'},
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <Box component="h4">Enter phone:</Box>
        <TextField
            name="phone" variant="outlined"
            placeholder='Enter phone' value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
        />
        <Button color='primary' type="submit" variant='contained' style={{width: '100%'}}>Login</Button>
    </Box>
    <Box component="p">Don't have account, <Link to="/member-types">register</Link> here</Box>
  </>;
}