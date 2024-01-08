import axios from "../../../axios";
import * as actionType from './ActionTypes';

export const getPatient = () => {
    return async dispatch => {
        dispatch({ type: actionType.GET_PATIENT_LOADING })
        await axios.get('/allpatients').then((res) => {
            dispatch({
                type: actionType.GET_PATIENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_PATIENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const addPatient = (data) => {
    return async dispatch => {
        await axios.post("/newpatient", { ...data }).then((res) => {
            dispatch({
                type: actionType.ADD_PATIENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.ADD_PATIENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const deletePatient = (id) => {
    return async dispatch => {
        await axios.delete(`/delete/patientdetail/${id}`).then((res) => {
            dispatch({
                type: actionType.DELETE_PATIENT,
                payload: id
            })
        }).catch((error) => {
            dispatch({
                type: actionType.DELETE_PATIENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const updatePatient = (data) => {
    return async dispatch => {
        await axios.patch('/update/patientdetails', { ...data }).then((res) => {
            dispatch({
                type: actionType.UPDATE_PATIENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.UPDATE_PATIENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const removeError = () => {
    return async dispatch => {
        await dispatch({ type: actionType.REMOVE_PATIENT_ERROR })
    }
}