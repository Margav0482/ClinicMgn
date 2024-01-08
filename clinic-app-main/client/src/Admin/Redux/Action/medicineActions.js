import * as actionTypes from './ActionTypes';
import axios from "../../../axios";

export const getMedicines = () => {
    return async dispatch => {
        dispatch({ type: actionTypes.GET_MEDICINES_LOADING })
        await axios.get("/allmedicines").then((res) => {
            dispatch({
                type: actionTypes.GET_MEDICINES,
                medicines: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.GET_MEDICINES_FAILED,
                error: error?.response?.data?.message
            })
        })
    }
}

export const addMedicine = (medicine) => {
    return async dispatch => {
        await axios.post('/newMedicine', { ...medicine }).then((res) => {
            dispatch({
                type: actionTypes.ADD_MEDICINE,
                medicines: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.ADD_MEDICINE_FAILED,
                error: error?.response?.data?.message
            })
        })
    }
}

export const deleteMedicine = (id) => {
    return async dispatch => {
        await axios.delete(`/delete/medicine/${id}`).then((res) => {
            dispatch({
                type: actionTypes.DELETE_MEDICINE,
                payload: id
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.DELETE_MEDICINE_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const updateMedicine = (medicine) => {
    return async dispatch => {
        await axios.patch('/update/medicine', { ...medicine }).then((res) => {
            dispatch({
                type: actionTypes.UPDATE_MEDICINE,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.UPDATE_MEDICINE_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}