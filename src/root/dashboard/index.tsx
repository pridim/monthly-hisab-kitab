import React from 'react'
import { Box } from '@mui/material'
import ManageItems from './manageItems';
import { UserItemProps } from '../registration';
import { getFirstCapLetter, getPrefix } from '../../utils';

export type ListItemType = {
    label: string;
    value: string;
}

const ItemLists: ListItemType[] = [
    { label: 'Milk', value: 'milk'},
    { label: 'Grocery', value: 'grocery'},
    { label: 'Others', value: 'others'},
]

const Dashboard = () => {
    
    const userData: string | null = localStorage.getItem('loggedInUser');
    let loggedInUser: UserItemProps = { user: { username: '', gender: '', phone:''}, userType: ''}
    if(userData) {
        loggedInUser = JSON.parse(userData) as UserItemProps;
    }
        
    return <Box width="100%" textAlign="left">
        { loggedInUser && 
            <Box component="h2" mb={4}>
                Hello, {getPrefix(loggedInUser.user.gender)} {getFirstCapLetter(loggedInUser.user.username)}
            </Box>
        }
        <ManageItems data={ItemLists}  />
    </Box>
}

export default Dashboard;
