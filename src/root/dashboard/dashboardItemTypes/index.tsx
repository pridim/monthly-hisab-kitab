import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material'
import { getFirstCapLetter } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import BasicTable from '../../../common/BasicTable';
import { StoredRecordType } from '../addNewRecord';

const DashboardItemTypes = () => {
    const [viewAll, setViewAll] = useState(false);
    const limit = 3;
    const { type } = useParams();

    const storedRecords = localStorage.getItem('records');
    const dataList = storedRecords ? JSON.parse(storedRecords) : []
    const milkData = dataList.find((item: StoredRecordType) => item.userType === type)
    let comp;
    if(!milkData)
        comp = <CustomCard message="No records found!" />;
    else
        comp = <CustomCard data={milkData} message=''/>;

    return <Box justifyContent="flex-start" width="100%">
        <Box component="h2">{getFirstCapLetter(type||'')} Dashboard</Box>
        {comp}
        {milkData && <>
            <Box component="h3" mb={0}>Previous Records</Box>
            <span>(Last {limit} records)</span>
        </>
        }
        {milkData &&
            <Box p={2} maxHeight="300px">
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={() => setViewAll(!viewAll)}>View all</Button>
                </Box>
                <BasicTable data={milkData} viewAll={viewAll} />
            </Box>
        }
    </Box>
}

export default DashboardItemTypes;
