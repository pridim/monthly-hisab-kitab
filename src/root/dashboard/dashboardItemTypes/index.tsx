import React from 'react'
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material'
import { getFirstCapLetter } from '../../../utils';
import MilkDashboard from './milkDashboard';

const DashboardItemTypes = () => {
    
    const { type } = useParams();

    const renderedComp = (type: string) => {
        let comp;
        switch(type) {
            case 'milk':
                comp = <MilkDashboard />;
                break;
            case 'grocery':
                comp = <MilkDashboard />;
                break;
            case 'others':
                comp = <MilkDashboard />;
                break;
        }
        
        return comp;
    }

    return <Box justifyContent="flex-start">
        <Box component="h2">{getFirstCapLetter(type||'')} Dashboard</Box>
        {renderedComp(type || '')}
    </Box>
}

export default DashboardItemTypes;
