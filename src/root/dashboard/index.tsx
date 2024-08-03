import React from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';

const Dashboard = () => {
    
    let user: any = localStorage.getItem('user');
    if(user) {
        user = JSON.parse(user);
    }   
    
    const getFormattedUsername = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
        
    return <Box width="100%" textAlign="left">
      {user && <Box component="h2" mb={4}>Hello, Mr. {getFormattedUsername(user.username)}</Box>}
        <ManageItems />
    </Box>
}

export default Dashboard;
