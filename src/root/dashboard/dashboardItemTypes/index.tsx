import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Chip } from '@mui/material'
import { getFirstCapLetter, getLoggedInUserDetails } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import BasicTable from '../../../common/BasicTable';
import { RecordType, StoredRecordType } from './../../../apis/types';
import ConfirmDialog from '../../../common/ConfirmDialog';
import AddNewRecord from '../addNewRecord';
import dayjs from 'dayjs';
import CustomModal from '../../../common/CustomModal';
import { ItemLists, MonthsList, YearsList } from '../../../apis/data';
import ManageItems from '../manageItems';

interface DashboardItemTypesProps {
    data?: StoredRecordType[];
    ItemActionType: string;
}

const DashboardItemTypes = (props: DashboardItemTypesProps) => {
    const [viewAll, setViewAll] = useState(false);
    const [selectedTab, setSelectedTab] = React.useState(props.ItemActionType || '')
    const [showDialog, setShowDialog] = useState(false);
    const [editRecord, setEditRecord] = useState<RecordType | null>(null);
    const [open, setOpen] = useState(false);
    const [filteredDataList, setFilteredDataList] = useState<StoredRecordType[]>([]);
    const [selectedYear, setSelectedYear] = useState(dayjs().year().toString());
    const [selectedMonth, setSelectedMonth] = useState((dayjs().month() + 1).toString());
    
    const user = getLoggedInUserDetails()

    useEffect(() => {
        let filteredList: any = props.data && props.data.map((item: StoredRecordType) => {
            if(item.userType === user.userType) {
                const filteredRecords = item.records.filter((record) => record.type === selectedTab)
                return {
                    ...item,
                    records: filteredRecords
                }
            }
            return null;
        })
        setFilteredDataList(filteredList)
    }, [props, selectedTab, user])

    const handleDateChange = (y: string, m: string) => {
        let filteredList: any = filteredDataList.map((item: StoredRecordType) => {
            const filteredRecords = item.records.filter(
                (record) => {
                    const year = dayjs(record.date).year().toString()
                    const month = (dayjs(record.date).month() + 1).toString()
                    if(record.type === selectedTab && year === y && month === m) {
                        console.log(year, selectedYear, month, selectedMonth)
                        return record
                    }
                    return null
                }
            )
            console.log('filteredRecords' + filteredRecords)
            return {
                ...item,
                records: filteredRecords
            }
        })
        setFilteredDataList(filteredList)
    }

    const handleDialogConfirm = (flag: boolean) => {
        if(flag) {
            alert('you can now delete this item')
        } else {
            setShowDialog(flag)
        }
    }

    const handlePreviousRepeat = () => {
        if(!filteredDataList || (filteredDataList.length === 0)) {
            alert("Please add at least one row to the table!")
            return;
        }
        let filteredList: any = filteredDataList.map((item: StoredRecordType) => {
            if(item.userType === user.userType) {
                const filteredRecords = item.records.filter((record) => record.type === selectedTab)
                let newRecords = filteredRecords;
                if(filteredRecords.length === 0) {
                    alert("Please add at least one row to the " + selectedTab)
                } else {
                    const previous_record = filteredRecords[filteredRecords.length - 1];
                    const today_record: any = {
                        ...previous_record,
                        date: new Date().toLocaleDateString(),
                    }
                    newRecords = [...filteredRecords, today_record]
                }
                return {
                    ...item,
                    records: newRecords
                }
            }
            return null;
        })
        setFilteredDataList(filteredList);
    }

    if(!props.data) {
        return null
    }

    let comp;
    if(filteredDataList.length === 0)
        comp = <CustomCard message="No records found!" ItemActionType={selectedTab} />;
    else
        comp = <CustomCard
            cardContent={filteredDataList[0]}
            ItemActionType={selectedTab}
            message=''
            handlePreviousRepeat={handlePreviousRepeat}
        />;

    return <>
        {showDialog && 
            <ConfirmDialog
                open={showDialog}
                title='Delete Record'
                description="Would you like to delete this record?"
                handleDialog={handleDialogConfirm}
            />
        }
        {editRecord &&
            <CustomModal open={open} handleClose={()=> setOpen(false)}>
                <AddNewRecord
                    editRecord={{
                        id: editRecord.recordId,
                        selectedActionType: editRecord.type,
                        selectedDate: dayjs(editRecord.date),
                        quantity: editRecord.quantity.toString(),
                        price: (editRecord.amount/editRecord.quantity).toString()
                    }}
                    handleUpdate={(open) => {
                        setOpen(open)
                        setEditRecord(null);
                    }}
                />
            </CustomModal>
        }
        <Box justifyContent="flex-start" width="100%">
            <Box component="h2">{getFirstCapLetter(selectedTab||'')} Dashboard</Box>
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
                <Box width="100%" sx={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <ManageItems
                        selectedItem={selectedYear}
                        setSelectedItem={(year) => {
                            setSelectedYear(year);
                            handleDateChange(year, selectedMonth)
                        }}
                        data={YearsList}
                        label='Year'
                        styles={{width: 'inherit'}}
                    />
                    <ManageItems
                        selectedItem={selectedMonth}
                        setSelectedItem={(month) => {
                            setSelectedMonth(month)
                            handleDateChange(selectedYear, month)
                        }}
                        data={MonthsList}
                        label='Month'
                        styles={{width: 'inherit'}}
                    />
                </Box>
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
                        onEdit={(editContent: RecordType) => {
                            setEditRecord(editContent)
                            setOpen(true)
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
