import React from 'react'
import { Box, Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserItemType } from '../../registration';
import { useNavigate } from 'react-router-dom';

export interface RecordType {
    type: string;
    date: string;
    quantity: number;
    price: number;
}

export interface StoredRecordType {
    userType: string;
    actionType: string;
    records: RecordType[]
    startAt: string;
    unit: string;
    price: number;
}

const AddNewRecord = () => {
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const [quantity, setQuantity] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>('');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    const user: UserItemType = loggedInUser ? JSON.parse(loggedInUser) : {}
    
    const allRecords = localStorage.getItem('records');
    const totalRecords: StoredRecordType[] = allRecords ? JSON.parse(allRecords) : [];

    const selectedActionType = localStorage.getItem('selectedActionType');

    const navigate = useNavigate();


    const handleSubmit = () => {
        if(user && selectedActionType) {
            if(totalRecords.length > 0) {
                const newStoredRecord = totalRecords.map((record) => {
                    if(record.userType === user.userType && record.actionType === selectedActionType) {
                        return {
                            ...record,
                            records: [
                                ...record.records, 
                                {
                                    type: selectedActionType,
                                    date: selectedDate?.format('DD-MM-YYYY'),
                                    quantity: parseFloat(quantity),
                                    price: parseFloat(quantity) * parseFloat(price)
                                }
                            ]
                        }
                    }
                    return record
                })
                localStorage.setItem('records', JSON.stringify(newStoredRecord))
                navigate(`/dashboard/type/${selectedActionType}`);
            } else {
                const payload = {
                    userType: user.userType,
                    actionType: selectedActionType,
                    unit: selectedActionType === 'milk' ? 'Ltr' : 'Cane',
                    price,
                    startAt: selectedDate?.format('DD-MM-YYYY'),
                    records: [
                        {
                            type: selectedActionType,
                            date: selectedDate?.format('DD-MM-YYYY'),
                            quantity: parseFloat(quantity),
                            price: parseFloat(quantity) * parseFloat(price)
                        }
                    ]
                }
                localStorage.setItem('records', JSON.stringify([payload]));
                navigate(`/dashboard/type/${selectedActionType}`);
            }
        }
    }

    return <Box display="flex" flexDirection="column" mt={2}>
        <Box component="h2" mb={1}>Add New Record</Box>
        <Box display="flex" flexDirection="column" gap={1} width="100%">
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={0}>Choose Date</Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{width: '100%', marginTop: '0px'}}>
                        <DatePicker value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{alignItems: 'flex-start'}}>
                <Box component="p" mb={1}>Enter Quantity</Box>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    fullWidth
                    endAdornment={<InputAdornment position="end">Ltr</InputAdornment>}
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
                <Box component="p" mb={1}>Enter Price (/Ltr)</Box>
                <OutlinedInput
                    id="outlined-adornment-price"
                    fullWidth
                    endAdornment={<InputAdornment position="end">Rs./Ltr</InputAdornment>}
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
