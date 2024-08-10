import React, { useState } from 'react'
import { Alert, Box, Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserItemType } from '../../registration';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserDetails } from '../../../utils';

import dayjs, { Dayjs } from 'dayjs';
import ManageItems from '../manageItems';
import { StoredRecordType } from '../../../apis/types';
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

interface AddRecordFormType {
    selectedActionType: string;
    selectedDate: Dayjs | null;
    quantity: string;
    price: string;
}

type EditRecordType = AddRecordFormType & {
    id: number;
}

interface AddNewRecordType {
    editRecord?: EditRecordType | null;
    handleUpdate?: (open: boolean) => void;
}

const AddNewRecord = (props: AddNewRecordType) => {
    const { editRecord } = props;
    const user: UserItemType = getLoggedInUserDetails()

    let defaultStateValue: AddRecordFormType = {
        selectedActionType: user?.actionType || '',
        selectedDate: dayjs(),
        quantity: '1',
        price: user.actionType === 'milk' ? '50' : '20'
    }
    if(editRecord) {
        defaultStateValue = editRecord
    }
    const [newRecord, setNewRecord] = useState<AddRecordFormType>({...defaultStateValue});
    const [showError, setShowError] = useState(false);
    
    const allRecords = localStorage.getItem('records');
    const totalRecords: StoredRecordType[] = allRecords ? JSON.parse(allRecords) : [];

    const navigate = useNavigate();

    const handleSubmit = () => {
        const { quantity, price, selectedDate } = newRecord;
        if(!quantity || !price) {
            setShowError(true);
            return
        }
        if(user && user.actionType) {
            const payload = {
                phone: user.user.phone,
                userType: user.userType,
                unit: user.actionType === 'milk' ? 'Ltr' : 'Cane',
                price: {
                    [user.actionType]: price
                },
                startAt: dayjs(selectedDate).format("L"),
                records: [
                    {
                        recordId: 1,
                        type: user.actionType,
                        date: selectedDate,
                        quantity: parseFloat(quantity),
                        amount: parseFloat(quantity) * parseFloat(price)
                    }
                ]
            }
            if(totalRecords.length > 0) {
                const filteredRecord: StoredRecordType[] = totalRecords.filter((record) =>
                    record.userType === user.userType && record.phone === user.user.phone
                )
                let newStoredRecord;
                if(filteredRecord.length === 0) {
                    newStoredRecord = [...totalRecords, payload]
                } else {
                    const recordPayload = {
                        type: user.actionType,
                        date: selectedDate,
                        quantity: parseFloat(quantity),
                        amount: parseFloat(quantity) * parseFloat(price)
                    }
                    let addRecordPayload;
                    let updateRecordPayload: any;
                    if(editRecord) {
                        updateRecordPayload = recordPayload
                    } else {
                        addRecordPayload = {
                            recordId: filteredRecord[0].records.length + 1,
                            ...recordPayload
                        }
                    }
                    const records = filteredRecord[0].records
                    const newRecordsArr =
                        editRecord
                        ? records.map((record) => record.recordId === editRecord.id ? updateRecordPayload : record)
                        : [...records, addRecordPayload]
                    
                    newStoredRecord = [{
                        ...filteredRecord[0],
                        price: {
                            ...filteredRecord[0].price,
                            [user.actionType]: price
                        },
                        records: newRecordsArr
                    }]
                }
                if(editRecord && props.handleUpdate) {
                    props.handleUpdate(false);
                }
                localStorage.setItem('records', JSON.stringify(newStoredRecord))
                navigate(`/dashboard/type/${user.actionType}`);
            } else {
                localStorage.setItem('records', JSON.stringify([{ id: 1, ...payload }]));
                navigate(`/dashboard/type/${user.actionType}`);
            }
        }
    }

    return <Box display="flex" flexDirection="column" mt={2} width="100%">
        <Box component="h2" mb={1}>{editRecord ? 'Update' : 'Add New'} Record</Box>
        {showError && <Alert color="error">Please provide all the required fields.</Alert>}
        <Box display="flex" flexDirection="column" gap={1} width="100%">
            <ManageItems
                selectedItem={newRecord.selectedActionType}
                setSelectedItem={(actionType) =>
                    setNewRecord({
                        ...newRecord, 
                        selectedActionType: actionType,
                        price: actionType === 'milk' ? '50' : '20'
                    })
                }
            />
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={0}>Choose Date</Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{width: '100%', marginTop: '0px'}}>
                        <DatePicker
                            value={dayjs(newRecord.selectedDate)}
                            onChange={(newValue) => setNewRecord({ ...newRecord, selectedDate: dayjs(newValue)})}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={1}>Enter Quantity<sup>*</sup></Box>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    fullWidth
                    endAdornment={<InputAdornment position="end">{user.actionType === 'milk' ? 'Ltr' : 'Cane'}</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    value={newRecord.quantity}
                    onChange={(e) => setNewRecord({...newRecord, quantity: e.target.value})}
                    placeholder='Enter quantity'
                />
                {/* <FormHelperText id="outlined-weight-helper-text">Leter</FormHelperText> */}
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={1}>Enter Price (/{user.actionType === 'milk' ? 'Ltr' : 'Cane'}) <sup>*</sup></Box>
                <OutlinedInput
                    id="outlined-adornment-price"
                    fullWidth
                    endAdornment={<InputAdornment position="end">Rs./{user.actionType === 'milk' ? 'Ltr' : 'Cane'}</InputAdornment>}
                    aria-describedby="outlined-price-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    value={newRecord.price}
                    onChange={(e) => setNewRecord({...newRecord, price: e.target.value})}
                    placeholder='Enter price'
                />
                {/* <FormHelperText id="outlined-weight-helper-text">Leter</FormHelperText> */}
            </FormControl>
            <Button
                fullWidth
                color="warning"
                variant='contained'
                sx={{marginTop: '1rem'}}
                onClick={handleSubmit}
            >{editRecord ? 'Update' : 'Save'}</Button>
        </Box>
    </Box>
}

export default AddNewRecord;
