import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFirstCapLetter, getLoggedInUserDetails } from '../../utils';
import CustomPaper from '../CustomPaper';
import { RecordType } from '../../apis/types';
import { Alert, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StoredRecordType } from '../../root/dashboard/addNewRecord';

function getSumPrice(total: number, record: RecordType) {
  return total + record.price;
}

function getSumQuantity(total: number, record: RecordType): number {
  return total + record.quantity;
}

const getTotalPrice = (data: StoredRecordType) => {
  const totalPrice = data.records.reduce(getSumPrice, 0)
  return totalPrice
}

const getTotalQuantity = (data: StoredRecordType) => {
  const totalQuantity = data.records.reduce(getSumQuantity, 0)
  return totalQuantity
}

const PrepCardContent =  ({ data, onAddNew, user }: { data: StoredRecordType, onAddNew: () => void, user: any }) => {
  return <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Start at: {data.startAt}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        Total Quantity: {getTotalQuantity(data)} {user.actionType === 'milk' ? 'Ltr' : 'Cane'}
      </Typography>
      <Typography variant="h6" component="div" fontWeight="bold">
        Total Amount: {getTotalPrice(data)} Rs.
      </Typography>
      <Typography variant="body2">
        {`${getFirstCapLetter(user.actionType)} (price/${user.actionType === 'milk' ? 'Ltr' : 'Cane'}) = ${data.price} Rs.`}
      </Typography>
    </CardContent>
    <CardActions sx={{justifyContent: 'center' }}>
      <Button color='info' size="large"
        variant='contained' fullWidth
        onClick={onAddNew}
      >
        Add New Record
      </Button>
    </CardActions>
  </React.Fragment>
};

interface CustomCardProps {
    data?: StoredRecordType;
    message: string;
}

export default function CustomCard(props: CustomCardProps) {
  const { data, message } = props;
  const navigate = useNavigate();
  const user = getLoggedInUserDetails();
  return <>
    { data && 
      <Box display="flex" justifyContent="flex-end" m={'1rem 1rem 0rem 1rem'}>
        <Chip label={user.actionType} color="success" sx={{ fontSize: '1.25rem', borderRadius: '0px'}} />
      </Box>
    }
    <CustomPaper>
      {(data && !message )&&
        <Box>
          <Card variant="outlined">
            <PrepCardContent data={data} onAddNew={() => navigate('/dashboard/add-new')} user={user} />
          </Card> 
        </Box>
      }
      {(!data && message) && <Alert color='info' variant='standard'>{message}</Alert>}
    </CustomPaper>;
    {!data &&
    <Button color='info' size="large"
      variant='contained' fullWidth
      onClick={() => navigate('/dashboard/add-new')}
    >
      Add New Record
    </Button>}
  </>
}
