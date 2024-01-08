import React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './FilterUser.css';

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

const FilterUser = (props) => {
  return (
    <TableContainer component={Paper} className="table_margin">
      <Table aria-label="simple table">
        <TableHead >
          <TableRow>
            <StyledTableCell align='center'>Patient Name</StyledTableCell>
            <StyledTableCell align='center'>Age</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        {props?.data.length > 0 ? props?.data.map((row, index) => (
          <TableBody key={index}>
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align='center' component="th" scope="row">
                {row?.patientId?.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.patientId?.age}</StyledTableCell>
              <StyledTableCell align="center">{row?.patientId?.phone}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        )) :
          <TableBody>No Data Found</TableBody>
        }

      </Table>
    </TableContainer>
  );
}

export default FilterUser;