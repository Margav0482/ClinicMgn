import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';

import { getPatient, addPatient, updatePatient, deletePatient, removeError } from '../../Redux/Action/patientActions';
import { getMedicines } from '../../Redux/Action/medicineActions';

import TextInput from '../../../UI/FormInput/TextInput';
import RedioButton from '../../../UI/FormInput/RedioButton';
import DataTable from '../../../UI/Table/DataTable';
import AddTreatment from '../Treatment/AddTreatment/AddTreatment';
import ShowDetails from './ShowDetails/ShowDetails';

import './Patient.css';
import Header from "../Header/Header";

const Patient = () => {

    const dispatch = useDispatch();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");

    // Treatment
    const [addTreatmentOpen, setAddTreatmentOpen] = useState(false);
    // Patient All Details
    const [showDetailsOpen, setShowDetailsOpen] = useState(false);

    const [data, setData] = useState({
        id: "",
        name: "",
        age: "",
        phone: "",
        email: "",
        gender: "Male",
        weight: "",
        address: "",
        date: "",
        password: ""
    });

    const [inputError, setInputError] = useState({
        nameEr: '',
        ageEr: '',
        gender: '',
        dateEr: '',
        passwordEr: '',
        emailEr: '',
        phoneEr: ''
    })

    const { patients, error, loading } = useSelector((state) => state.patientStore);
    const { medicines } = useSelector((state) => state.medicine);


    const makesEmptyState = () => {
        setData({ id: "", name: "", age: "", phone: "", email: "", gender: "Male", weight: "", address: "", date: "", password: "" });
        setInputError({ nameEr: '', ageEr: '', gender: '', dateEr: '', passwordEr: '', emailEr: '', phoneEr: '' })
    }

    const handleChange = (prop) => (e) => {
        e.preventDefault();
        setData({ ...data, [prop]: e.target.value });
        // setData(JSON.parse(JSON.stringify({ ...data, [prop]: e.target.value })));
    };

    const handleDeleteOpen = (e) => { setData({ ...data, id: e.id }); setDeleteOpen(true); };
    const handleDeleteClose = () => { setTimeout(() => { makesEmptyState(); }, [100]); setDeleteOpen(false); };

    const handleAddOpen = (e) => {
        if (e.row) {
            setData({
                ...data,
                id: e.row._id,
                name: e.row.name,
                age: e.row.age,
                phone: e.row.phone,
                email: e.row.email,
                gender: e.row.gender,
                weight: e.row.weight,
                address: e.row.address,
                date: e.row.date,
            })
        }
        setAddOpen(true);
    };

    const handleShowDetails = (e) => {
        setData({
            ...data,
            id: e.row._id,
            name: e.row.name,
            age: e.row.age,
            phone: e.row.phone,
            email: e.row.email,
            gender: e.row.gender,
            weight: e.row.weight,
            address: e.row.address,
            date: e.row.date
        })
        setShowDetailsOpen(true);
    }

    const handleAddTreament = (e) => {
        setData({
            ...data,
            id: e.row._id,
            name: e.row.name,
        })
        setAddTreatmentOpen(true);
    }

    // All dialog comman
    const handleAddClose = (e) => {
        makesEmptyState();
        setClick(false);
        dispatch(removeError());
        setAddOpen(false);
        setAddTreatmentOpen(false);
        setShowDetailsOpen(false);
        setMsg("");
    };

    const isValid = () => {
        const reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        let nameEr = data.name === "" ? 'please enter name' : '';
        let ageEr = data.age === "" ? 'please enter age' : '';
        let genderEr = data.gender === "" ? 'please enter gender' : '';
        let dateEr = data.date === "" ? 'please enter date' : '';
        let emailEr = data.email !== '' ? data.email.trim().includes('@') ? '' : 'please enter valid email' : '';
        let phoneEr = data?.phone !== '' && data?.phone !== null ? reg.test(data.phone) ? '' : 'please enter valid phone' : '';

        if (nameEr || ageEr || genderEr || dateEr || emailEr || phoneEr) {
            setInputError({ nameEr, ageEr, genderEr, dateEr, emailEr, phoneEr });
            setClick(true);
            return false;
        }
        return true;
    }

    const handleAddNew = (e) => {
        e.preventDefault();
        const valid = isValid();
        if (data.email.length > 0) {
            const isExist = patients.filter((item) => item.email === data.email);
            if (isExist.length > 0) {
                setMsg("Email Already Exists");
                return;
            }
        }
        if (valid) {
            dispatch(addPatient(data));
            setAddOpen(false);
            message.success("Add New Patient Success.")
            makesEmptyState();
            dispatch({ type: "REMOVE_ERROR" });
            setMsg("");
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const valid = isValid();
        if (valid) {
            dispatch(updatePatient(data));
            setAddOpen(false);
            message.success("Update Patient Success.")
            makesEmptyState();
            setMsg("");
        }
    }

    const handleDelete = () => {
        dispatch(deletePatient(data.id));
        message.success("Delete Patient Success.")
        setDeleteOpen(false);
    }

    useEffect(() => {
        dispatch(getPatient());
        dispatch(getMedicines());
        makesEmptyState();
    }, [dispatch])

    useEffect(() => {
        error !== "" && setAddOpen(true)
    }, [error])

    const columns = [
        {
            field: 'id', headerName: 'Sr No.', width: "100", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        {params.api.getRowIndex(params.row._id) + 1}
                    </>
                );
            }
        },
        { field: 'name', headerName: 'Patient Name', width: "250" },
        { field: 'gender', headerName: 'Gender', width: "100" },
        { field: 'age', headerName: 'Age', width: "100" },
        { field: 'phone', headerName: 'Phone', width: "120" },
        { field: 'address', headerName: 'Address', width: "250" },
        { field: 'weight', headerName: 'Weight', width: "100" },
        { field: 'date', headerName: 'Date', width: "150", renderCell: (params) => { return moment(params.row.date).format('L') } },
        {
            field: 'action', headerName: 'Action', width: "200", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" size="large" color="warning" onClick={() => handleAddOpen(params)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="add" size="large" color="success" onClick={() => handleAddTreament(params)}>
                            <AddIcon />
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

            {/* Patient */}
            <Dialog open={addOpen} >
                {data.id !== "" ? <DialogTitle>Edit Patient</DialogTitle> : <DialogTitle>Add New Patient</DialogTitle>}
                {error || msg ? <label className='error_msg'>{`${error}${msg}`}</label> : ""}
                <DialogContent >
                    <TextInput autoFocus={true} label="Name *" type="text" change="name" data={data.name} handleChange={handleChange} click={click} eMessage={inputError.nameEr} newError="" />
                    <TextInput label="Age *" type="number" change="age" data={data.age} handleChange={handleChange} click={click} eMessage={inputError.ageEr} newError="" />
                    <TextInput label="Phone" type="number" change="phone" data={data.phone} handleChange={handleChange} click={click} eMessage="" newError={inputError.phoneEr} />
                    <TextInput label="Email" type="email" change="email" data={data.email} handleChange={handleChange} click={click} eMessage="" newError={inputError.emailEr} />
                    <RedioButton label="Gender *" change="gender" data={data.gender} handleChange={handleChange} click={click} eMessage={inputError.genderEr} newError="" />
                    <TextInput label="Address" type="text" multiline={true} change="address" data={data.address} handleChange={handleChange} />
                    <TextInput label="Weight" type="number" change="weight" data={data.weight} handleChange={handleChange} />
                    <TextInput label="" type="date" change="date" data={data.date} handleChange={handleChange} click={click} eMessage={inputError.date} newError="" />
                    {/* {data.id === "" ? data.email !== "" ? <PasswordInput data={data.password} isShow={showPassword} handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} click={click} eMessage="" newError={inputError.passwordEr} /> : "" : ""} */}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    {data.id !== "" ? <Button onClick={handleUpdate}>Update</Button> : <Button onClick={handleAddNew}>Add</Button>}
                </DialogActions>
            </Dialog>

            {/* Treatment */}
            <AddTreatment addTreatmentOpen={addTreatmentOpen} handleAddClose={handleAddClose} data={data} medicineData={medicines} />
            {/* show Details */}
            <ShowDetails showDetailsOpen={showDetailsOpen} handleAddClose={handleAddClose} data={data} />

            <CssBaseline />
            <DataTable title="Patient List" buttonName="New Patient" handleAddOpen={handleAddOpen} loading={loading} onRowDoubleClick={true} columns={columns} mainData={patients} handleShowDetails={handleShowDetails} />
        </React.Fragment>
        </div>
    );
}

export default Patient; 