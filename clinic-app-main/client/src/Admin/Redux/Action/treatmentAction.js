import * as actionType from './ActionTypes';
import axios from "../../../axios";

export const getTreatment = () => {
    return async dispatch => {
        dispatch({ type: actionType.GET_TREATMENT_LOADING })
        await axios.get('/allpatienthelth').then((res) => {
            dispatch({
                type: actionType.GET_TREATMENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_TREATMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const addTreatment = (data) => {
    return async dispatch => {
        await axios.post('/newPatienthelth', { ...data }).then((res) => {
            dispatch({
                type: actionType.ADD_TREATMENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.ADD_TREATMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const deleteTreatment = (id) => {
    return async dispatch => {
        await axios.delete(`/delete/patienthelth/${id}`).then((res) => {
            dispatch({
                type: actionType.DELETE_TREATMENT,
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

export const updateTreatment = (data) => {
    return async dispatch => {
        await axios.patch('/update/patienthelth', { ...data }).then((res) => {
            dispatch({
                type: actionType.UPDATE_TREATMENT,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.UPDATE_TREATMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}