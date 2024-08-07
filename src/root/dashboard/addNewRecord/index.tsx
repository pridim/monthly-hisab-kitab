import React, { useEffect, useState } from 'react'
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
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export interface RecordType {
    type: string;
    date: string;
    quantity: number;
    price: number;
}

export interface StoredRecordType {
    phone: string;
    userType: string;
    records: RecordType[]
    startAt: string;
    unit: string;
    price: {
        [key: string]: number;
    };
}

const AddNewRecord = () => {
    const user: UserItemType = getLoggedInUserDetails()
    
    const [selectedItem, setSelectedItem] = React.useState(user?.actionType || '');
    const [selectedDate, setSelectedDate] = React.useState<Dayjs|null>(dayjs());
    const [quantity, setQuantity] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>(user.actionType === 'milk' ? '50' : '20');
    const [showError, setShowError] = useState(false);
    
    
    const allRecords = localStorage.getItem('records');
    const totalRecords: StoredRecordType[] = allRecords ? JSON.parse(allRecords) : [];

    const navigate = useNavigate();

    useEffect(() => {
        let price = '20';
        if(selectedItem === 'milk') {
            price = '50'
        }
        setPrice(price)
    }, [selectedItem])

    const handleSubmit = () => {
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
                        type: user.actionType,
                        date: dayjs(selectedDate).format("L LT"),
                        quantity: parseFloat(quantity),
                        price: parseFloat(quantity) * parseFloat(price)
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
                    const newRecord = {
                        type: user.actionType,
                        date: dayjs(selectedDate).format("L LT"),
                        quantity: parseFloat(quantity),
                        price: parseFloat(quantity) * parseFloat(price)
                    }
                    const records = filteredRecord[0].records
                    const newRecordsArr = [...records, newRecord]
                    newStoredRecord = [{
                        ...filteredRecord[0],
                        price: {
                            ...filteredRecord[0].price,
                            [user.actionType]: price
                        },
                        records: newRecordsArr
                    }]
                }
                localStorage.setItem('records', JSON.stringify(newStoredRecord))
                navigate(`/dashboard/type/${user.actionType}`);
            } else {
                localStorage.setItem('records', JSON.stringify([payload]));
                navigate(`/dashboard/type/${user.actionType}`);
            }
        }
    }

    return <Box display="flex" flexDirection="column" mt={2} width="100%">
        <Box component="h2" mb={1}>Add New Record</Box>
        {showError && <Alert color="error">Please provide all the required fields.</Alert>}
        <Box display="flex" flexDirection="column" gap={1} width="100%">
            <ManageItems selectedItem={selectedItem} setSelectedItem={setSelectedItem}  />
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={0}>Choose Date</Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{width: '100%', marginTop: '0px'}}>
                        <DatePicker value={dayjs(selectedDate)} onChange={(newValue) => setSelectedDate(dayjs(newValue))} />
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Enter price'
                />
                {/* <FormHelperText id="outlined-weight-helper-text">Leter</FormHelperText> */}
            </FormControl>
            <Button color="warning" variant='contained' sx={{marginTop: '1rem'}} fullWidth onClick={handleSubmit}>Submit</Button>
        </Box>
    </Box>
}

export default AddNewRecord;
