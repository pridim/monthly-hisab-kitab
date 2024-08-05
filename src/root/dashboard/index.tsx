import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';
import { UserItemType } from '../registration';
import { getFirstCapLetter, getPrefix } from '../../utils';
import { ItemLists } from '../../apis/data';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    useEffect(() => {
        // let loggedInUser = localStorage.getItem('loggedInUser') || '';
        // let totalRecords = localStorage.getItem('totalRecords') || [];
        // if(loggedInUser && totalRecords) {
        //     loggedInUser = JSON.parse(loggedInUser);
        //     const recordFound = totalRecords?.find((record) => record.phone === loggedInUser?.phone)
        // }
    }, [])
    
    const userData: string | null = localStorage.getItem('loggedInUser');
    let loggedInUser: UserItemType = { user: { username: '', gender: '', phone:''}, userType: ''}
    if(userData) {
        loggedInUser = JSON.parse(userData) as UserItemType;
    }
        
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
