import React, { useEffect } from 'react'
import { Alert, Box, Button } from '@mui/material'
import { getLoggedInUserDetails } from '../../utils';
import { ItemLists } from '../../apis/data';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardItemTypes from './dashboardItemTypes';
import DashboardItem from './dashboardItem';

const Dashboard = () => {
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUserDetails();
    const storedRecords = localStorage.getItem('records');
    const dataList = storedRecords ? JSON.parse(storedRecords) : []

    useEffect(() => {
        if(!loggedInUser) {
            navigate('/login')
        }
    }, [loggedInUser, navigate])
        
    return <Box width="100%" p={2}>
        {(loggedInUser && !loggedInUser.actionType)
            && dataList.length === 0 && <>
            <Alert color='info' sx={{marginBottom: '2rem'}}>No record found!</Alert>
            <Button color="primary" variant='contained' onClick={() => navigate('/add-new-record')}>
                Add new record
            </Button>
        </>}

        {(loggedInUser && !loggedInUser.actionType)
            && dataList.length > 0
            && ItemLists.map((item) =>
            <DashboardItem key={item.value} ItemActionType={item.value} />
        )}
        
        {loggedInUser && loggedInUser.actionType &&
            <DashboardItemTypes data={dataList} ItemActionType={loggedInUser.actionType} /> 
        }   

        <Outlet />
    </Box>
}

export default Dashboard;
