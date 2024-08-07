import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dataListItemType, RecordType } from '../../apis/types';
import { getFirstCapLetter } from '../../utils';
import { StoredRecordType } from '../../root/dashboard/addNewRecord';

function createData(
  record: RecordType
) {
    const { type, quantity, date, price  } = record;
  return { type, quantity, price, date };
}

interface BasicTableProps {
    data: StoredRecordType | null;
    viewAll: boolean;
}

export default function BasicTable(props: BasicTableProps) {
  const { data, viewAll } = props;
  const [row, setRow] = React.useState<RecordType[]>([])

  React.useEffect(() => {
    if(!data) return
    let row = data.records.map((item) => createData(item))
    if(!viewAll) {
        row = row.slice(0, 3)
    }
    row = row.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
    setRow(row);
  }, [data, viewAll])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {row.length > 0 && Object.keys(row[0]).map((type) =>
                <TableCell key={type} sx={{fontWeight: 'bold'}}>{getFirstCapLetter(type)}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row, index) => (
            <TableRow
              key={`${row.type}-${row.date}-${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align='center'>{row.quantity}</TableCell>
              <TableCell align='center'>{row.price}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}