import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import TextLabel from '../../../common/LabelComp';
import { ListItemType } from '../../../apis/types';

interface ManageItemsProps {
  data: ListItemType[];
}

export default function ManageItems(props: ManageItemsProps) {
  const { data } = props;
  const selectedActionType = localStorage.getItem('selectedActionType');
  const [selectedItem, setSelectedItem] = React.useState(
    selectedActionType || ''
  );

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
    localStorage.setItem('selectedActionType', event.target.value)
    if(event.target.value)
      navigate(`/dashboard/type/${event.target.value}`)
  };

  return (
    <Box textAlign="left">
        <TextLabel label="Select item to manage" />
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