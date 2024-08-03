import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useNavigate, useParams } from 'react-router-dom';

export interface UserProps {
  username: string;
  gender: string;
  phone: string;
}

export interface UserItemProps {
  user: UserProps;
  userType: string | undefined;
}

export default function UserRegistration() {
  const [user, setUser] = React.useState<UserProps>({
    username: '',
    gender: '',
    phone: ''
  })

  const navigate = useNavigate();
  const params = useParams();
  const { userType } = params;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let users: string | null = localStorage.getItem('users');
    if(!users) {
      localStorage.setItem('users', JSON.stringify([{ user, userType }]))
    } else {
      let userList: Array<UserItemProps>  = JSON.parse(users);
      userList = [...userList, { user, userType}]
      localStorage.setItem('users', JSON.stringify(userList))
    }
    localStorage.setItem('loggedInUser', JSON.stringify({ user, userType }))

    navigate('/dashboard')
  }

  return <>
    <Box component="h2" textAlign="center">Registration</Box>
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
        <FormControl>
          <FormLabel id="gender-group-label" sx={{fontSize: '1.125rem', fontWeight: 'bold', color: '#000'}}>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-group-label"
            name="gender-group"
            onChange={(e) => setUser({...user, gender: e.target.value})}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <Box component="h4">Enter phone:</Box>
        <TextField
            name="phone" variant="outlined"
            placeholder='Enter phone' value={user.phone} 
            onChange={(e) => setUser({...user, phone: e.target.value})} 
        />
        <Button color='primary' type="submit" variant='contained' style={{width: '100%'}}>Submit</Button>
    </Box>
    <Box component="p">Already have an account, <Link to="/login">login</Link> here</Box>
  </>;
}