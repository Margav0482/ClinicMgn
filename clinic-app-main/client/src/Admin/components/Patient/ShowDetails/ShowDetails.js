import { useEffect, forwardRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { getAllDetails } from '../../../Redux/Action/generalAction';

import './ShowDetails.css';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ShowDetails = (props) => {

    const dispatch = useDispatch();
    const { allDetails } = useSelector((state) => state.allDetailStore);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allDetails.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = (e) => {
        e.preventDefault();
        props.handleAddClose();
    };

    useEffect(() => {
        if (props.data.id.length > 1) {
            dispatch(getAllDetails(props.data.id))
        }
    }, [props, dispatch])

    return (
        <div>
            <Dialog
                fullScreen
                open={props.showDetailsOpen}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} className="header_wepper">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Patient Details
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                        <Typography variant="h4" align='center' className='title_text' component="div">Personal Details</Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 450 }} aria-label="customized table">
                                <TableRow>
                                    <TableCell align='center' size='medium'>PatientName</TableCell>
                                    <TableCell align='center' size='medium'>{props.data.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Age</TableCell>
                                    <TableCell align='center'>{props.data.age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Email</TableCell>
                                    <TableCell align='center'>{props.data.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Weight</TableCell>
                                    <TableCell align='center'>{props.data.weight}</TableCell> 
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Phone</TableCell>
                                    <TableCell align='center'>{props.data.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Address</TableCell>
                                    <TableCell align='center'>{props.data.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Register Date</TableCell>
                                    <TableCell align='center'>{moment(props.data.date).format("L")}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                <Grid container className='table_margin'>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Reason</StyledTableCell>
                                        <StyledTableCell align="right">Medicines</StyledTableCell>
                                        <StyledTableCell align="right">Visit Date</StyledTableCell>
                                        <StyledTableCell align="right">Due Days</StyledTableCell>
                                        <StyledTableCell align="right">Due Date</StyledTableCell>
                                        <StyledTableCell align="right">Suggestion</StyledTableCell>
                                        <StyledTableCell align="right">Discription</StyledTableCell>
                                        <StyledTableCell align="right">Report</StyledTableCell>
                                        <StyledTableCell align="right">Next Visite</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? allDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : allDetails
                                    ).map((row) => (
                                        <StyledTableRow key={row?._id}>
                                            <StyledTableCell component="th" scope="row">
                                                {row?.reason}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row?.medicines}</StyledTableCell>
                                            <StyledTableCell align="right">{moment(row?.date).format('L')}</StyledTableCell>
                                            <StyledTableCell align="right">{row?.due_days}</StyledTableCell>
                                            <StyledTableCell align="right">{moment(row?.due_date).format('L')}</StyledTableCell>
                                            <StyledTableCell align="right">{row?.suggestion}</StyledTableCell>
                                            <StyledTableCell align="right">{row?.description}</StyledTableCell>
                                            <StyledTableCell align="right">{row?.report_image.length > 1 ? <a href={row?.report_image} target="_blank" rel="noreferrer" download="report" >Show</a> : ''}</StyledTableCell>
                                            <StyledTableCell align="right">{moment(row?.due_date).fromNow()}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={9}
                                            count={allDetails.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

export default ShowDetails;