import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { ListItemType } from '../../../apis/types';
import { getLoggedInUserDetails } from '../../../utils';

interface ManageItemsProps {
  selectedItem: string;
  setSelectedItem: (selectedItem: string) => void;
  data: ListItemType[];
  label: string;
  styles?: any;
}

export default function ManageItems(props: ManageItemsProps) {
  const { selectedItem, data, label, styles = {} } = props;
  const user = getLoggedInUserDetails();

  const handleChange = (event: SelectChangeEvent) => {
    if(!event.target.value) {
      return
    } else {
      props.setSelectedItem(event.target.value);
    }
    localStorage.setItem('loggedInUser', JSON.stringify({...user, actionType: event.target.value}))
  };

  return (
    <Box textAlign="left" sx={{...styles}}>
      <Box component="p" mb={1}>{label}</Box>
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