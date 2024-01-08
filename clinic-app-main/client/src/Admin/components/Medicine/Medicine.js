import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';

import { getMedicines, addMedicine, deleteMedicine, updateMedicine } from '../../Redux/Action/medicineActions';

import DataTable from '../../../UI/Table/DataTable';

import './Medicine.css';
import Header from "../Header/Header";


const Medicine = () => {
    const dispatch = useDispatch();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");

    const [data, setData] = useState({
        id: "",
        medicine_name: "",
        medicine_description: ""
    });

    const { medicines, error, loading } = useSelector((state) => state.medicine);


    const makesEmptyState = () => {
        setData({
            id: "",
            medicine_name: "",
            medicine_description: ""
        })
    }

    const handleDeleteOpen = (e) => { setData({ ...data, id: e.id }); setDeleteOpen(true); };
    const handleDeleteClose = () => { setTimeout(() => { makesEmptyState(); }, [100]); setDeleteOpen(false); };

    const handleAddOpen = (e) => {
        if (e.row) {
            setData({
                ...data,
                id: e.row._id,
                medicine_name: e.row.medicine_name,
                medicine_description: e.row.medicine_description
            })
        }
        setAddOpen(true);
    };
    const handleAddClose = () => { setTimeout(() => { makesEmptyState(); setClick(false); }, [100]); setAddOpen(false) };


    const handleChange = (prop) => (e) => {
        e.preventDefault();
        setData({ ...data, [prop]: e.target.value });
    };

    const isValid = () => {
        if (data.medicine_name === "") {
            setClick(true);
            return false;
        }
        return true;
    }

    const handleAddNew = (e) => {
        e.preventDefault();
        const valid = isValid();
        if (valid) {
            const index = medicines.find((item) => item?.medicine_name === data?.medicine_name)
            if (!index) {
                dispatch(addMedicine(data));
                setAddOpen(false);
                message.success("Add Medicine Success.")
                makesEmptyState();
                dispatch({ type: "REMOVE_ERROR" });
                setMsg("");
            } else {
                setMsg("Medicine Already Exists");
            }
        }
    }

    const handleUpdate = () => {
        const valid = isValid();
        if (valid) {
            // const index = medicines.find((item)=>item?.medicine_name === data?.medicine_name)
            // if(!index){
            dispatch(updateMedicine(data));
            setAddOpen(false);
            message.success("Update Medicine Success.")
            makesEmptyState();
            dispatch({ type: "REMOVE_ERROR" });
            setMsg("");
            // }else{
            //     setMsg("Medicine Already Exists");
            // }            
        }
    }

    const handleDelete = () => {
        dispatch(deleteMedicine(data.id));
        message.success("Delete Medicine Success.")
        setDeleteOpen(false);
    }

    useEffect(() => {
        dispatch(getMedicines());
        setAddOpen(false);
    }, [dispatch])

    useEffect(() => {
        error !== "" && setAddOpen(true)
    }, [error])

    const columns = [
        {
            field: 'id', headerName: 'ID', width: "150", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        {params.api.getRowIndex(params.row._id) + 1}
                    </>
                );
            }
        },
        { field: 'medicine_name', headerName: 'Medicine Name', width: "400", resizable: true },
        { field: 'medicine_description', headerName: 'Description', width: "700", sortable: false },
        {
            field: 'action', headerName: 'Action', with: "300", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
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
                        Are You Sure You Want To Delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Conform</Button>
                </DialogActions>
            </Dialog>

            {/* Medicine */}
            <Dialog open={addOpen} >
                {data.id !== "" ? <DialogTitle>Edit Medicine</DialogTitle> : <DialogTitle>Add New Medicine</DialogTitle>}
                {error || msg ? <label className='error_msg'>{`${error}${msg}`}</label> : ""}
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Medicine Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={data.medicine_name}
                        onChange={handleChange('medicine_name')}
                        error={click && data?.medicine_name === ""}
                        helperText={click && data?.medicine_name === "" ? 'Please Enter Medicine' : ""}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Medicine Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={data.medicine_description}
                        onChange={handleChange('medicine_description')}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    {data.id !== "" ? <Button onClick={handleUpdate}>Update</Button> : <Button onClick={handleAddNew}>Add</Button>}
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <DataTable title="Medicine List" buttonName="New Medicine" mainData={medicines} columns={columns} handleAddOpen={handleAddOpen} loading={loading} />
        </React.Fragment>
        </div>
    );
}

export default Medicine;