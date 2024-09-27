import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFirstCapLetter } from '../../utils';
import CustomPaper from '../CustomPaper';
import { RecordType } from '../../apis/types';
import { Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StoredRecordType } from '../../apis/types';

function getSumPrice(total: number, record: RecordType) {
  return total + record.amount;
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

interface PrepCardContentProps {
  data: StoredRecordType;
  ItemActionType: string;
  onAddNew: () => void;
  onRepeatPrevious?: () => void;
}

const PrepCardContent =  ({ data, ItemActionType, onAddNew, onRepeatPrevious }: PrepCardContentProps) => {
  return <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Start at: {data.startAt}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        Total Quantity: {getTotalQuantity(data)} {ItemActionType === 'milk' ? 'Ltr' : 'Cane'}
      </Typography>
      <Typography variant="h6" component="div" fontWeight="bold">
        Total Amount: {getTotalPrice(data)} Rs.
      </Typography>
      <Typography variant="body2">
        {`${getFirstCapLetter(ItemActionType)} (price/${ItemActionType === 'milk' ? 'Ltr' : 'Cane'}) = ${data.price[ItemActionType]} Rs.`}
      </Typography>
    </CardContent>
    <CardActions sx={{justifyContent: 'center' }}>
      <Button color='info' size="large"
        variant='contained' fullWidth
        onClick={onAddNew}
      >
        Add New Record
      </Button>
      <Button color='info' size="large"
        variant='contained' fullWidth
        onClick={() => {
          if(onRepeatPrevious) {
            onRepeatPrevious();
          }
        }}
      >
        Repeat Previous
      </Button>
    </CardActions>
  </React.Fragment>
};

interface CustomCardProps {
  cardContent?: StoredRecordType | null;
  message: string;
  ItemActionType?: string;
  handlePreviousRepeat?: () => void;
}

export default function CustomCard(props: CustomCardProps) {
  const { cardContent, message, ItemActionType } = props;
  const navigate = useNavigate();
  return <>
    <CustomPaper>
      {(cardContent && !message )&&
        <Box>
          <Card variant="outlined">
            <PrepCardContent
              data={cardContent}
              ItemActionType={ItemActionType || ''}
              onAddNew={() => navigate('/add-new-record')}
              onRepeatPrevious={props.handlePreviousRepeat}
            />
          </Card> 
        </Box>
      }
      {(!cardContent && message) && <Alert color='info' variant='standard'>{message}</Alert>}
    </CustomPaper>;
    {!cardContent &&
    <Button color='info' size="large"
      variant='contained' fullWidth
      onClick={() => navigate('/add-new-record')}
    >
      Add New Record
    </Button>}
  </>
}
