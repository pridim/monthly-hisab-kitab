import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Button } from '@mui/material';
import TextLabel from '../../../common/LabelComp';
import { useNavigate } from 'react-router-dom';

export default function ManageItems() {
  const [selectedItem, setSelectedItem] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };

  return (
    <Box>
        <TextLabel label="Select item to manage" />
        <FormControl fullWidth sx={{mb: 4}}>
            <Select
                value={selectedItem}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Milk</MenuItem>
                <MenuItem value={20}>grocery</MenuItem>
                <MenuItem value={30}>Other</MenuItem>
            </Select>
        </FormControl>
        <Button color="warning"
            variant='outlined'
            disabled={!selectedItem} fullWidth
            onClick={() => navigate('/add-data')}
        > 
            Continue
        </Button>
    </Box>
  );
}