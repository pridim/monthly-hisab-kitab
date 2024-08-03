import React from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';
import { UserItemProps } from '../registration';

const Dashboard = () => {
    
    const userData: string | null = localStorage.getItem('loggedInUser');
    let loggedInUser: UserItemProps = { user: { username: '', gender: '', phone:''}, userType: ''}
    if(userData) {
        loggedInUser = JSON.parse(userData) as UserItemProps;
    }
    
    const getFormattedUsername = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getPrefix = (gender: string) => {
        return gender === 'male' ? 'Mr.' : 'Mrs.'
    }
        
    return <Box width="100%" textAlign="left">
        { loggedInUser && 
            <Box component="h2" mb={4}>
                Hello, {getPrefix(loggedInUser.user.gender)} {getFormattedUsername(loggedInUser.user.username)}
            </Box>
        }
        <ManageItems />
    </Box>
}

export default Dashboard;
