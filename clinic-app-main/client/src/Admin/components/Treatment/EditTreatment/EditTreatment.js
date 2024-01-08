import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
// import FileBase from 'react-file-base64';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import TextInput from '../../../../UI/FormInput/TextInput';
import { storage } from '../../../firebase/index';
import { updateTreatment } from '../../../Redux/Action/treatmentAction';

const EditTreatment = (props) => {
    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    const [medicineList, setMedicineList] = useState([]);
    const [image, setImage] = useState("");
    const [load, setLoad] = useState(false);
    const [data, setData] = useState("");

    const isValid = () => {
        if (data.name !== "" && data.reason !== "" && data.date !== "") {
            return true;
        }
        setClick(true);
        return false;
    }

    const handleChange = (prop) => (e) => {
        e.preventDefault();
        setData({ ...data, [prop]: e.target.value });
    };

    const handleimage = async (e) => {
        const file = e.target.files[0];
        // console.log("file", file);
        // const image = await resizeFile(file);
        setImage(file);
    };

    const handleEditTreatment = (e) => {
        e.preventDefault();
        const valid = isValid();
        if (valid) {
            setLoad(true);
            if (image) {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => { },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then((url) => {
                                // setData({ ...data, report_image: url })
                                EditDetailhandler({ ...data, report_image: url });
                            });
                    }
                );
            } else {
                EditDetailhandler(data);
            }

        }
    }

    const EditDetailhandler = (data) => {
        dispatch(updateTreatment(data));
        message.success("Update TreatmentDetails Success.")
        setLoad(false);
        setData("");
        props.handleEditClose();
    }

    const handleCloseTreatment = (e) => {
        e.preventDefault();
        setClick(false);
        props.handleEditClose();
    }

    useEffect(() => {
        if (props.data.id !== "") {
            setData({ ...data, ...props.data })
        }
    }, [props])

    useEffect(() => {
        const temp = [];
        props.medicineData.forEach(element => {
            temp.push(element.medicine_name)
        });
        setMedicineList(temp);
    }, [props])

    return (
        <Dialog open={props.addTreatmentOpen} >
            <DialogTitle>Add New Treatment</DialogTitle>
            {/* {error || msg ? <label className='error_msg'>{`${error}${msg}`}</label> : ""} */}
            <DialogContent >
                <TextInput label="Name *" type="text" change="name" data={data.name} handleChange={handleChange} readOnly={true} click={click} eMessage="" />
                <TextInput label="Reason *" type="test" change="reason" data={data.reason} handleChange={handleChange} click={click} eMessage="Please Enter reason" />
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={medicineList}
                        getOptionLabel={(option) => option}
                        defaultValue={data.medicines}
                        // value={data.medicines}
                        onChange={(e, value) => setData({ ...data, medicines: value })}
                        // onChange={props?.handleChange(props?.change)} 
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Madicines"
                                placeholder="Medicines"
                            />
                        )}
                    />
                </FormControl>
                <TextInput label="" type="date" change="date" data={data.date} handleChange={handleChange} click={click} eMessage="Please Enter Date" />
                <TextInput label="Next Visite" type="number" change="due_days" data={data.due_days} handleChange={handleChange} />
                <TextInput label="suggestion" type="text" multiline={true} change="suggestion" data={data.suggestion} handleChange={handleChange} />
                <TextInput label="description" type="text" multiline={true} change="description" data={data.description} handleChange={handleChange} />
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleimage(e)}
                        placeholder="Item Image"
                        accept="image/*"
                    />
                    <img src={data.report_image} alt="" height={150} />
                    {/* <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setData({ ...data, report_image: base64 })}
                    /> */}
                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseTreatment}>Cancel</Button>
                {/* <Button onClick={addDetailhandler}>Add</Button> */}
                {load ? <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                >
                    Update
                </LoadingButton>
                    : <Button onClick={handleEditTreatment}>Update</Button>}
            </DialogActions>
        </Dialog>
    );
}

export default EditTreatment