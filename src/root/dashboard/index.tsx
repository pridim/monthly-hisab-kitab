import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';
import { getFirstCapLetter, getLoggedInUserDetails, getPrefix } from '../../utils';
import { ItemLists } from '../../apis/data';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUserDetails();

    useEffect(() => {
        if(!loggedInUser) {
            navigate('/login')
        }
    }, [loggedInUser, navigate])
        
    return <Box width="100%">
        { loggedInUser && 
            <Box component="h2" mb={0}>
                Hello, {getPrefix(loggedInUser.user.gender)} {getFirstCapLetter(loggedInUser.user.username)}
            </Box>
        }
        <ManageItems data={ItemLists} />
        <Outlet />
    </Box>
}

export default Dashboard;
