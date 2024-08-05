import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material'
import { getFirstCapLetter, getLoggedInUserDetails } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import BasicTable from '../../../common/BasicTable';
import { StoredRecordType } from '../addNewRecord';

const DashboardItemTypes = () => {
    const [viewAll, setViewAll] = useState(false);
    const { type } = useParams();

    const user = getLoggedInUserDetails()

    const storedRecords = localStorage.getItem('records');
    const dataList = storedRecords ? JSON.parse(storedRecords) : []

    const filteredDataList = dataList.map((item: StoredRecordType) => {
        if(item.userType === user.userType) {
            const filteredRecords = item.records.filter((record) => record.type === user.actionType)
            return {
                ...item,
                records: filteredRecords
            }
        }
        return null;
    })

    let comp;
    if(filteredDataList.length === 0)
        comp = <CustomCard message="No records found!" />;
    else
        comp = <CustomCard data={filteredDataList[0]} message=''/>;

    return <Box justifyContent="flex-start" width="100%">
        <Box component="h2">{getFirstCapLetter(type||'')} Dashboard</Box>
        {comp}
        {filteredDataList.length > 0 && <>
            <Box component="h3" mb={0}>Previous Records</Box>
            <Box p={2} maxHeight="300px">
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={() => setViewAll(!viewAll)}>View all</Button>
                </Box>
                <BasicTable data={filteredDataList[0]} viewAll={viewAll} />
            </Box>
            </>
        }
    </Box>
}

export default DashboardItemTypes;
