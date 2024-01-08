import * as actionType from '../Action/ActionTypes';

const initialState = {
    userToken: "",
    userData: {},
    userAllDetails: [],
    allappoinment: [],
    error: "",
    success: false
}

const store = (state = initialState, action) => {
    switch (action.type) {

        case actionType.CLEAR_ERROR:
            return ({
                ...state,
                error: "",
                success: false
            })

        case actionType.SET_TOKEN:
            return ({
                ...state,
                userToken: action?.payload
            })

        case actionType.REMOVE_TOKEN:
            return ({
                ...state,
                userToken: "",
                error: ""
            })

        case actionType.SIGNUP:
            return ({
                ...state,
                userToken: action?.userToken,
                userData: action?.userData,
                success: action?.success,
                error: ""
            })

        case actionType.AFTER_SIGNUP:
            return ({
                ...state,
                success: false,
                error: ""
            })

        case actionType.SIGNUP_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.SIGNIN:
            return ({
                ...state,
                userToken: action?.userToken,
                userData: action?.userData,
                success: action?.success,
                error: ""
            })
        case actionType.SIGNIN_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.CHECK_EMAIL:
            return ({
                ...state,
                success: action?.success,
            })
        case actionType.CHECK_EMAIL_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.CHECK_OTP:
            return ({
                ...state,
                success: action?.success
            })
        case actionType.CHECK_OTP_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.CHANGE_PASSWORD:
            return ({
                ...state,
                success: action?.success
            })
        case actionType.CHANGE_PASSWORD_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.GET_USER_DETAILS:
            return ({
                ...state,
                userData: action?.payload
            })
        case actionType.GET_USER_DETAILS_FAILED:
            return ({
                ...state,
                userData: action?.payload
            })

        case actionType.UPDATE_USER_DETAILS:
            return ({
                ...state,
                userData: action?.payload,
                success: action?.success
            })
        case actionType.UPDATE_USER_DETAILS_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.UPDATE_PASSWORD:
            return ({
                ...state,
                success: action?.success
            })
        case actionType.UPDATE_PASSWORD_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.GET_USER_ALL_DETAILS:
            return ({
                ...state,
                userAllDetails: action?.payload
            })
        case actionType.GET_USER_ALL_DETAILS_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        // appoinment
        case actionType.ALL_APPOINMENT:
            return ({
                ...state,
                allappoinment: action?.payload
            })
        case actionType.ALL_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.BOOK_APPOINMENT:
            return ({
                ...state,
                allappoinment: [...state.allappoinment, { ...action?.payload }]
            })
        case actionType.BOOK_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.UPDATE_APPOINMENT:
            return ({
                ...state,
                allappoinment: state.allappoinment.map((item) => {
                    if (item?._id === action?.payload?._id) {
                        return ({
                            ...item,
                            reason: action?.payload?.reason,
                            appoinment_date: action?.payload?.appoinment_date
                        })
                    }
                    return item;
                })
            })

        case actionType.UPDATE_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.DELETE_APPOINMENT:
            return ({
                ...state,
                allappoinment: state.allappoinment.filter((item) => item?._id !== action?.payload)
            })

        case actionType.DELETE_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })
        // end Appoinment
        default:
            return state;
    }
}

export default store;