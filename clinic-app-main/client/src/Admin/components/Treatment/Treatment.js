import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';

import { getTreatment, deleteTreatment } from '../../Redux/Action/treatmentAction';
import { getMedicines } from '../../Redux/Action/medicineActions';

import DataTable from '../../../UI/Table/DataTable';
import EditTreatment from './EditTreatment/EditTreatment';

import './Treatment.css';
import Header from "../Header/Header";

const Treatment = () => {
    const dispatch = useDispatch();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [data, setData] = useState({
        id: "",
        patientId: "",
        name: "",
        reason: "",
        medicines: "",
        date: "",
        due_days: "",
        suggestion: "",
        description: "",
        report_image: ""
    });

    const { treatmentsDetails, loading } = useSelector((state) => state.treatmentStore);
    const { medicines } = useSelector((state) => state.medicine);

    const makesEmptyState = () => {
        setData({
            id: "",
            patientId: "",
            name: "",
            reason: "",
            medicines: "",
            date: "",
            due_days: "",
            suggestion: "",
            description: "",
            report_image: ""
        })
    }

    const handleDeleteOpen = (e) => { setData({ ...data, id: e.id }); setDeleteOpen(true); };

    const handleDeleteClose = () => { makesEmptyState(); setDeleteOpen(false); };

    const handleAddOpen = (e) => {
        if (e.row) {
            setData({
                ...data,
                id: e.row._id,
                patientId: e.row.patientId._id,
                name: e.row.patientId.name,
                reason: e.row.reason,
                medicines: e.row.medicines,
                date: e.row.date,
                due_days: e.row.due_days,
                suggestion: e.row.suggestion,
                description: e.row.description,
                report_image: e.row.report_image
            })
        }
        setEditOpen(true);
    };

    const handleEditClose = () => { makesEmptyState(); setEditOpen(false) };

    const handleDelete = () => {
        dispatch(deleteTreatment(data.id));
        message.success("Delete Treatment Success.")
        setDeleteOpen(false);
    }

    useEffect(() => {
        dispatch(getTreatment());
        dispatch(getMedicines());
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
            width: "250",
            renderCell: (params) => {
                return params?.row?.patientId?.name
            }
        },
        { field: 'reason', headerName: 'Reason', width: "250" },
        { field: 'medicines', headerName: 'Medicine', width: "350" },
        { field: 'date', headerName: 'Date', width: "150", renderCell: (params) => { return moment(params.row.date).format('L') } },
        { field: 'due_days', headerName: 'Due Days', width: "100" },
        { field: 'due_date', headerName: 'Due Date', width: "150", renderCell: (params) => { return moment(params.row.due_date).format('L') } },
        {
            field: 'action', headerName: 'Action', with: "150", sortable: false, disableColumnSelector: true,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Button size='' onClick={(e) => console.log(params)}>Click</Button> */}
                        <IconButton aria-label="edit" size="large" color="success" onClick={() => handleAddOpen(params)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            }
        },
    ];

    return (
        <div><Header headerPages={["dashboard", "patient", "medicine", "treatment", "appoinment"]} />
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
                    <Button onClick={handleDelete}>Conform</Button>
                </DialogActions>
            </Dialog>

            <EditTreatment addTreatmentOpen={editOpen} handleEditClose={handleEditClose} data={data} medicineData={medicines} />

            <CssBaseline />
            <DataTable title="Treatment List" buttonName="" mainData={treatmentsDetails} columns={columns} handleAddOpen={handleAddOpen} loading={loading} />
        </React.Fragment>
        </div>
    );
}

export default Treatment;