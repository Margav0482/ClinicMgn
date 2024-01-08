import * as actionType from './ActionTypes';
import axios from '../../../axios';

export const signUp = (data) => {
    return async dispatch => {
        await axios.post('/user/signup', { ...data }).then((res) => {
            dispatch({
                type: actionType.SIGNUP,
                userData: res.data.resData,
                userToken: res.data.token,
                success: true
            })
            localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.token);
        }).catch((error) => {
            dispatch({
                type: actionType.SIGNUP_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const signIn = (data) => {
    return async dispatch => {
        await axios.post('/user/signin', { ...data }).then((res) => {
            dispatch({
                type: actionType.SIGNIN,
                userData: res?.data?.user,
                userToken: res?.data?.token,
                success: true
            })
            localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.token);
        }).catch((error) => {
            dispatch({
                type: actionType.SIGNIN_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

// Forgot Password

// checkEmail
export const checkEmailExists = (data) => {
    return async dispatch => {
        await axios.post('/user/forgotpassword/checkmail', { ...data }).then((res) => {
            dispatch({
                type: actionType.CHECK_EMAIL,
                payload: res?.data,
                success: true
            })
        }).catch((error) => {
            dispatch({
                type: actionType.CHECK_EMAIL_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

// checkOTP
export const checkOTP = (data) => {
    return async dispatch => {
        await axios.post('/user/verityOtp', { ...data }).then((res) => {
            dispatch({
                type: actionType.CHECK_OTP,
                success: true
            })
        }).catch((error) => {
            dispatch({
                type: actionType.CHECK_OTP_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

// ChangePassword
export const changePassword = (data) => {
    return async dispatch => {
        await axios.patch('/user/changepassword', { ...data }).then((res) => {
            dispatch({
                type: actionType.CHANGE_PASSWORD,
                success: true
            })
        }).catch((error) => {
            dispatch({
                type: actionType.CHANGE_PASSWORD_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const getUserDetails = () => {
    return async dispatch => {
        await axios.get('/user/detail').then((res) => {
            dispatch({
                type: actionType.GET_USER_DETAILS,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_USER_DETAILS_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const updateDetails = (data) => {
    return async dispatch => {
        await axios.patch('/user/updateProfile', { ...data }).then((res) => {
            dispatch({
                type: actionType.UPDATE_USER_DETAILS,
                payload: res.data,
                success:true
            })
        }).catch((error) => {
            dispatch({
                type: actionType.UPDATE_USER_DETAILS_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const updatePassword = (data) => {
    return async dispatch => {
        await axios.patch('/user/updatePassword', { ...data }).then((res) => {
            dispatch({
                type: actionType.UPDATE_PASSWORD,
                success: true
            })
        }).catch((error) => {
            dispatch({
                type: actionType.UPDATE_PASSWORD_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const getUserAllDetails = () => {
    return async dispatch => {
        await axios.get('/user/alldetails').then((res) => {
            dispatch({
                type: actionType.GET_USER_ALL_DETAILS,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_USER_ALL_DETAILS_FAILED, 
                payload: error?.response?.data?.message
            })
        })
    }
}

// Appoinment

export const allAppoinment = () => {
    return async dispatch => {
        await axios.get('/user/allAppoinment').then((res) => {
            dispatch({
                type: actionType.ALL_APPOINMENT,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.ALL_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const bookAppoinment = (data) => {
    return async dispatch => {
        await axios.post('/user/bookAppoinment', { ...data }).then((res) => {
            dispatch({
                type: actionType.BOOK_APPOINMENT,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.BOOK_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const updateAppoinment = (data) => {
    return async dispatch => {
        await axios.patch('/user/updateAppoinment', { ...data }).then((res) => {
            dispatch({
                type: actionType.UPDATE_APPOINMENT,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.UPDATE_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const deleteAppoinment = (id) => {
    return async dispatch => {
        await axios.delete(`/user/deleteappoinment/${id}`).then((res) => {
            dispatch({
                type: actionType.DELETE_APPOINMENT,
                payload: id
            })
        }).catch((error) => {
            dispatch({
                type: actionType.DELETE_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

// end appoinment