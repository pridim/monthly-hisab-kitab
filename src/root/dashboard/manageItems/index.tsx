import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import TextLabel from '../../../common/LabelComp';
import { useNavigate } from 'react-router-dom';
import { ListItemType } from '..';

interface ManageItemsProps {
    data: ListItemType[];
}

export default function ManageItems(props: ManageItemsProps) {
  const { data } = props;
  const [selectedItem, setSelectedItem] = React.useState('');

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
    navigate(`/dashboard/type/${event.target.value}`)
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
                {data.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
            </Select>
        </FormControl>
    </Box>
  );
}