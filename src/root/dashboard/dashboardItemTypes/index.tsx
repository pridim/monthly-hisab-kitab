import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button, Chip } from '@mui/material'
import { getFirstCapLetter, getLoggedInUserDetails } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import BasicTable from '../../../common/BasicTable';
import { StoredRecordType } from '../addNewRecord';
import { ItemLists } from '../../../apis/data';

interface DashboardItemTypesProps {
    data?: StoredRecordType[];
    ItemActionType: string;
}

const DashboardItemTypes = (props: DashboardItemTypesProps) => {
    const [viewAll, setViewAll] = useState(false);
    const [selectedTab, setSelectedTab] = React.useState(props.ItemActionType || '')
    
    const { type } = useParams();
    const user = getLoggedInUserDetails()

    if(!props.data) {
        return null
    }

    const filteredDataList = props.data.map((item: StoredRecordType) => {
        if(item.userType === user.userType) {
            const filteredRecords = item.records.filter((record) => record.type === selectedTab)
            return {
                ...item,
                records: filteredRecords
            }
        }
        return null;
    })

    let comp;
    if(filteredDataList.length === 0)
        comp = <CustomCard message="No records found!" ItemActionType={selectedTab} />;
    else
        comp = <CustomCard cardContent={filteredDataList[0]} ItemActionType={selectedTab} message=''/>;

    return <Box justifyContent="flex-start" width="100%">
        <Box component="h2">{getFirstCapLetter(type||'')} Dashboard</Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={'1rem 1rem 0rem 1rem'}>
            {ItemLists.map((item) =>
                <Chip
                    key={item.value}
                    label={item.label}
                    color={item.value === selectedTab ? "success" : "default"}
                    sx={{ fontSize: '1.25rem', borderRadius: '0px'}}
                    onClick={() => {
                        setSelectedTab(item.value);
                        localStorage.setItem('loggedInUser', JSON.stringify({...user, actionType: item.value}))
                    }}
                />
            )}
        </Box>

        {comp}
        
        {filteredDataList.length > 0 && <>
            <Box component="h3" mb={0}>Previous Records</Box>
            <Box p={2} maxHeight="300px">
                {filteredDataList &&
                filteredDataList[0] &&
                filteredDataList[0]?.records.length > 2 &&
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={() => setViewAll(!viewAll)}>Show {!viewAll ? ' more' : ' less'}</Button>
                </Box>}
                <BasicTable data={filteredDataList[0] || null} viewAll={viewAll} />
            </Box>
            </>
        }
    </Box>
}

export default DashboardItemTypes;
