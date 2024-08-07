import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Chip } from '@mui/material'
import { getFirstCapLetter, getLoggedInUserDetails } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import BasicTable from '../../../common/BasicTable';
import { StoredRecordType } from './../../../apis/types';
import { ItemLists } from '../../../apis/data';
import ConfirmDialog from '../../../common/ConfirmDialog';

interface DashboardItemTypesProps {
    data?: StoredRecordType[];
    ItemActionType: string;
}

const DashboardItemTypes = (props: DashboardItemTypesProps) => {
    const [viewAll, setViewAll] = useState(false);
    const [selectedTab, setSelectedTab] = React.useState(props.ItemActionType || '')
    const [showDialog, setShowDialog] = useState(false);
    
    const { type } = useParams();
    const user = getLoggedInUserDetails()

    const handleDialogConfirm = (flag: boolean) => {
        if(flag) {
            alert('you can now delete this item')
        } else {
            setShowDialog(flag)
        }
    }

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

    return <>
        {showDialog && 
            <ConfirmDialog
                open={showDialog}
                title='Delete Record'
                description="Would you like to delete this record?"
                handleDialog={handleDialogConfirm}
            />
        }
        <Box justifyContent="flex-start" width="100%">
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
                {filteredDataList &&
                    filteredDataList[0] &&
                    filteredDataList[0]?.records.length === 0 &&
                    <Alert color='info'>No record found!</Alert>    
                }
                <Box p={0} maxHeight="300px">
                    {filteredDataList &&
                    filteredDataList[0] &&
                    filteredDataList[0]?.records.length > 3 &&
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={() => setViewAll(!viewAll)}>Show {!viewAll ? ' more' : ' less'}</Button>
                    </Box>}
                    <BasicTable
                        data={filteredDataList[0] || null}
                        viewAll={viewAll}
                        onEdit={(editContent: any) => {
                            console.log(editContent)
                        } }
                        onDelete={() => setShowDialog(true)}
                    />
                </Box>
                </>
            }
        </Box>
    </>
}

export default DashboardItemTypes;
