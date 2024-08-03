import React from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';

const Dashboard = () => {
    
    let userData: any = localStorage.getItem('userData');
    if(userData) {
        userData = JSON.parse(userData);
    }   
    
    const getFormattedUsername = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
        
    return <Box width="100%" textAlign="left">
      {userData && <Box component="h2" mb={4}>Hello, Mr. {getFormattedUsername(userData.user.username)}</Box>}
        <ManageItems />
    </Box>
}

export default Dashboard;
