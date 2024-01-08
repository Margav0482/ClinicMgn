import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';

import { allAppoinment, bookAppoinment, updateAppoinment, deleteAppoinment } from '../../Redux/Action/userAction';
import { CLEAR_ERROR } from '../../Redux/Action/ActionTypes';

import DataTable from '../../../UI/Table/DataTable';

import './Appoinment.css';
import Header from "../Header/Header";


const Appoinment = () => {
    const dispatch = useDispatch();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");

    const [data, setData] = useState({
        id: "",
        reason: "",
        appoinment_date: ""
    });

    const { allappoinment, error, loading } = useSelector((state) => state.userStore);


    const makesEmptyState = () => {
        setData({
            id: "",
            reason: "",
            appoinment_date: ""
        })
    }

    const handleDeleteOpen = (e) => { setData({ ...data, id: e.id }); setDeleteOpen(true); };
    const handleDeleteClose = () => { setTimeout(() => { makesEmptyState(); }, [100]); setDeleteOpen(false); };

    const handleAddOpen = (e) => {
        if (e.row) {
            setData({
                ...data,
                id: e.row._id,
                reason: e.row.reason,
                appoinment_date: e.row.appoinment_date
            })
        }
        setAddOpen(true);
    };
    const handleAddClose = () => { makesEmptyState(); dispatch({ type: CLEAR_ERROR }); setClick(false); setAddOpen(false); setMsg(""); };


    const handleChange = (prop) => (e) => {
        e.preventDefault();
        setData({ ...data, [prop]: e.target.value });
    };

    const isValid = () => {
        if (data.reason === "" || data.appoinment_date === "") {
            setClick(true);
            return false;
        }
        return true;
    }

    const handleAddNew = (e) => {
        e.preventDefault();
        const valid = isValid();
        if (valid) {
            const index = allappoinment.find((item) => item?.status === false)
            if (!index) {
                dispatch(bookAppoinment(data));
                setClick(false);
                setAddOpen(false);
                message.success("Appointment has been booked successfully!")
                console.log(`Appoinment.js: (client) - Data: ${JSON.stringify(data)}`)
                //makesEmptyState();
                dispatch({ type: CLEAR_ERROR });
                setMsg("");
            } else {
                setMsg("There's already 1 scheduled appointment!");
            }
        }
    }

    const handleUpdate = () => {
        const valid = isValid();
        if (valid) {
            dispatch(updateAppoinment(data));
            setAddOpen(false);
            setClick(false);
            message.success("Updated Appointment successfully!")
            makesEmptyState();
            dispatch({ type: CLEAR_ERROR });
            setMsg("");
        }
    }

    const handleDelete = () => {
        dispatch(deleteAppoinment(data.id));
        dispatch({ type: CLEAR_ERROR });
        message.success("Delete Appointment Success.")
        setDeleteOpen(false);
        makesEmptyState();
    }

    useEffect(() => {
        dispatch(allAppoinment());
        setAddOpen(false);
    }, [dispatch])

    useEffect(() => {
        error !== "" && setAddOpen(true)
    }, [error])

    const columns = [
        {
            field: 'sr', headerName: 'Sr.', width: "150", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        {params.api.getRowIndex(params.row._id) + 1}
                    </>
                );
            }
        },
        { field: 'reason', headerName: 'Reason', width: "450"},
        { field: 'appointment_date', headerName: 'Appointment Date', width: "300", sortable: false, renderCell: (params) => moment(params?.row?.appoinment_date).format('L') },
        {
            field: 'status', headerName: 'Appointment Status', width: "300", sortable: true,
            renderCell: (params) => {
                if(params?.row?.app_status === "") {
                    //console.log(`Appoinment.js: (client) (const columns) params?.row : ${JSON.stringify(params?.row)}`)
                    return (
                        <>
                            <Button variant="contained" color='warning'>Pending</Button>
                        </>
                    )
                } else if(params?.row?.app_status === "Approved") {
                    return (
                        <>
                            <Button variant="contained" color='success'>Approved</Button>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Button variant="contained" color='error'>Denied</Button>
                        </>
                    )
                }
            }
            //renderCell: (params) => params?.row?.status ? <Button variant="contained" color='success' >Approve</Button> : <Button variant="contained" color='warning' >Pendding</Button>
        },
        {
            field: 'action', headerName: 'Action', with: "350", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                if(params?.row?.app_status === "Approved"){
                    return (
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                            <DeleteIcon />
                        </IconButton>
                    )
                } else if (params?.row?.app_status === "") {
                    return (
                        <div>
                        <IconButton aria-label="edit" size="large" color="success" onClick={() => handleAddOpen(params)}>
                            <EditIcon />
                        </IconButton>
                    <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                        <DeleteIcon />
                    </IconButton>
                    </div>
                    )
                } else {
                    return (
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                // return (
                //     <>
                //         {
                //             params?.row?.status ? <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                //                 <DeleteIcon />
                //             </IconButton> :
                //                 <>
                //                     <IconButton aria-label="edit" size="large" color="success" onClick={() => handleAddOpen(params)}>
                //                         <EditIcon />
                //                     </IconButton>
                //                     <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                //                         <DeleteIcon />
                //                     </IconButton></>
                //         }
                //     </>
                // );
            }
        },
    ];

    return (
        <div>
            <Header headerPages={["dashboard", 'appoinment']} />
        <React.Fragment>
            {/* conformation dialog */}
            <Dialog open={deleteOpen}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <IconButton aria-label="delete" size="large" color="error">
                            <ErrorIcon />
                        </IconButton>
                        Are You Sure You Want To Delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Medicine */}
            <Dialog open={addOpen} >
                {data.id !== "" ? <DialogTitle>Change Appointment</DialogTitle> : <DialogTitle>Book Appointment</DialogTitle>}
                {error || msg ? <label className='error_msg'>{`${error}${msg}`}</label> : ""}
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="Reason"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={data.reason}
                        onChange={handleChange('reason')}
                        error={click && data?.reason === ""}
                        helperText={click && data?.reason === "" ? 'Please Enter Reason' : ""}
                    />
                    <TextField
                        margin="dense"
                        id="appoinment_date"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={data.appoinment_date}
                        onChange={handleChange('appoinment_date')}
                        error={click && data?.appoinment_date === ""}
                        helperText={click && data?.appoinment_date === "" ? 'Please Select Appointment Date' : ""}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    {data.id !== "" ? <Button onClick={handleUpdate}>Update</Button> : <Button onClick={handleAddNew}>Add</Button>}
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <DataTable title="Appointment List" buttonName="Book Appoinment" mainData={allappoinment} columns={columns} handleAddOpen={handleAddOpen} loading={loading} />
        </React.Fragment>
        </div>
    );
}

export default Appoinment;