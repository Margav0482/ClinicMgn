import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

import { getAppoinments, appoveAppoinmet, deleteAppoinment, declineAppoinmet} from '../../Redux/Action/generalAction';

import DataTable from '../../../UI/Table/DataTable';
import Header from "../Header/Header";

const Appoinment = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { appoinments } = useSelector((state) => state.allDetailStore);

    const handleDeleteOpen = (e) => { setId(e.id); setDeleteOpen(true); };

    const handleDeleteClose = () => { setDeleteOpen(false); };

    const handleApprove = (e) => {
        const id = e.id;
        if (id !== "") {
            dispatch(appoveAppoinmet(id));
            message.success("Approve Appoinment");
        }
    }

    const handleDecline = (e) => {
        const id = e.id;
        if (id !== "") {
            console.log(`Appoinment.js: (admin) id: ${id}`);
            dispatch(declineAppoinmet(id));
            message.success("Decline Appoinment");
        }
    }

    const handleDelete = () => {
        if (id !== "") {
            dispatch(deleteAppoinment(id));
            message.success("Decline Appoinment .")
            setDeleteOpen(false);
        }
    }

    useEffect(() => {
        dispatch(getAppoinments());
    }, [dispatch])


    const columns = [
        {
            field: 'id', headerName: 'ID', width: "100",
            renderCell: (params) => {
                return (
                    <>
                        {params.api.getRowIndex(params.row._id) + 1}
                    </>
                );
            }
        },
        {
            field: 'name',
            headerName: 'Patient Name',
            width: "350",
            renderCell: (params) => {
                return params?.row?.patientId?.name
            }
        },
        {
            field: 'age',
            headerName: 'Age',
            width: "100",
            renderCell: (params) => {
                return params?.row?.patientId?.age
            }
        },
        { field: 'reason', headerName: 'Reason', width: "350" },
        { field: 'appoinment_date', headerName: 'Appoinment Date', width: "200", renderCell: (params) => { return moment(params.row.appoinment_date).format('L') } },
        {
            field: 'status',
            headerName: 'Status',
            width: "220",
            renderCell: (params) => {
                if(params?.row?.app_status === "Approved") {
                    console.log(`Appoinment.js: (client) (const columns) params?.row : ${params?.row}`)
                    return (
                        <>
                            <Button variant="contained" color='success' disabled onClick={() => handleApprove(params)}>Approved</Button>

                        </>
                    )
                }else if(params?.row?.app_status === "Declined") {
                    console.log(`Appoinment.js: (client) (const columns) params?.row : ${params?.row}`)
                    return (
                        <>
                            <Button variant="contained" color='error' disabled onClick={() => handleApprove(params)}>Declined</Button>

                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Button variant="contained" onClick={() => handleApprove(params)}>Approve</Button>

                            <Button variant="contained" onClick={() => handleDecline(params)}>Decline</Button>
                        </>
                    )
                }
            }
        },
        // {
        //     field: 'status',
        //     headerName: 'Status',
        //     width: "220",
        //     renderCell: (params) => params?.row?.status ? <Button variant="contained" disabled >Decline</Button> : <Button variant="contained" onClick={() => handleDecline(params)} >Decline</Button>
        // },
        // {
        //     field: 'action', headerName: 'Action', with: "170", sortable: false, disableColumnMenu: true,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
        //                     <DeleteIcon />
        //                 </IconButton>
        //             </>
        //         );
        //     }
        // },
    ];

    return (
        <div>
        <Header headerPages={["dashboard", "patient", "medicine", "treatment", "appoinment"]} />
        <React.Fragment>
            {/* conformation dialog */}
            <Dialog open={deleteOpen}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <IconButton aria-label="delete" size="large" color="error">
                            <ErrorIcon />
                        </IconButton>
                        Are You Sure You Want To Decline ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDelete()}>Confirm</Button>
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <DataTable title="Appointment List" buttonName="" mainData={appoinments} columns={columns} handleAddOpen="" />
        </React.Fragment>
        </div>
    );
}

export default Appoinment;