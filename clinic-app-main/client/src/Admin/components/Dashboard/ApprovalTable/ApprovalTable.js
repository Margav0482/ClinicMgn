import * as React from 'react';
import moment from 'moment';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const ApprovalTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Reason</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => {
            if (!row.status) {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row?.patientId?.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.patientId?.age}</StyledTableCell>
                  <StyledTableCell align="right">{row?.reason}</StyledTableCell>
                  <StyledTableCell align="right">{moment(row?.appoinment_date).format('L')}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="edit" size="large" color="primary" onClick={() => props.handleApprove(row?._id)}>
                      <AssignmentTurnedInIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            }
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ApprovalTable;