import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFirstCapLetter } from '../../utils';
import CustomPaper from '../CustomPaper';
import { dataListItemType, RecordType } from '../../apis/types';
import { Alert, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function getSumPrice(total: number, record: RecordType) {
  return total + record.price;
}

function getSumQuantity(total: number, record: RecordType) {
  return total + record.price;
}

const getTotalPrice = (data: dataListItemType) => {
  const totalPrice = data.records.reduce(getSumPrice, 0)
  return totalPrice
}

const getTotalQuantity = (data: dataListItemType) => {
  const totalQuanteity = data.records.reduce(getSumQuantity, 0)
  return totalQuanteity
}

const PrepCardContent =  ({ data, onAddNew }: { data: dataListItemType, onAddNew: () => void; }) => {
  return <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Start at: {data.startAt}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        Total Quantity: {getTotalQuantity(data)} {data.unit}.
      </Typography>
      <Typography variant="h6" component="div" fontWeight="bold">
        Total Amount: {getTotalPrice(data)} Rs.
      </Typography>
      <Typography variant="body2">
        {`${getFirstCapLetter(data.type)} (price/${data.unit}) = ${data.price} Rs.`}
      </Typography>
    </CardContent>
    <CardActions sx={{justifyContent: 'center' }}>
      <Button color='info' size="large"
        variant='contained' fullWidth
        onClick={onAddNew}
      >
        Add Today
      </Button>
    </CardActions>
  </React.Fragment>
};

interface CustomCardProps {
    data?: dataListItemType;
    message: string;
}

export default function CustomCard(props: CustomCardProps) {
    const { data, message } = props;
    const navigate = useNavigate();
  return <>
  {data && <Box display="flex" justifyContent="flex-end" m={'1rem 1rem 0rem 1rem'}>
    <Chip label={data.type} color="success" sx={{ fontSize: '1.25rem', borderRadius: '0px'}} />
  </Box>}
  <CustomPaper>
        {(data && !message )&& <Box>
            <Card variant="outlined">
              <PrepCardContent data={data} onAddNew={() => navigate('/dashboard/add-new')} />
            </Card> 
          </Box>
        }
        {(!data && message) && <Alert color='info' variant='standard'>{message}</Alert>}
    </CustomPaper>;
    <Button color='info' size="large"
        variant='contained' fullWidth
        onClick={() => navigate('/dashboard/add-new')}
      >
        Add Today
      </Button>
  </>
}
