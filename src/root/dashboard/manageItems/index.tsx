import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { ListItemType } from '../../../apis/types';
import { getLoggedInUserDetails } from '../../../utils';
import { ItemLists } from '../../../apis/data';

interface ManageItemsProps {
  selectedItem: string;
  setSelectedItem: (selectedItem: string) => void;
}

export default function ManageItems(props: ManageItemsProps) {
  const { selectedItem } = props;
  const user = getLoggedInUserDetails();
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    if(!event.target.value) {
      navigate('/dashboard')
    } else {
      props.setSelectedItem(event.target.value);
    }
    localStorage.setItem('loggedInUser', JSON.stringify({...user, actionType: event.target.value}))
  };

  const data: ListItemType[] = ItemLists;
  return (
    <Box textAlign="left">
      <Box component="p" mb={1}>Select record type</Box>
      <FormControl fullWidth sx={{mb: 0}}>
        <Select
          value={selectedItem}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}