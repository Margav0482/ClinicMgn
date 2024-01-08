import * as actionType from '../Action/ActionTypes';

const initialState = {
    allDetails: [],
    appoinments: [],
    error: ""
}

const store = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_ALLDETAILS:
            return ({
                ...state,
                allDetails: action?.payload,
                error: ""
            })
        case actionType.GET_ALLDETAILS_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.GET_APPOINMENTS:
            return ({
                ...state,
                appoinments: action?.payload
            })
        case actionType.GET_APPOINMENTS_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.APPROVE_APPOINMENT:
            return ({
                ...state,
                appoinments: state.appoinments.map((data) => {
                    if (action?.payload?._id === data?._id) {
                        return {
                            ...data,
                            status: action?.payload?.status
                        }
                    }
                    return data;
                })
            })


        case actionType.APPROVE_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.DECLINE_APPOINMENT:
            console.log("GeneralReducer.js: (Admin) - DECLINE_APPOINTMENT");
            return ({
                ...state,
                appoinments: state.appoinments.map((data) => {
                    if (action?.payload?._id === data?._id) {
                        return {
                            ...data,
                            status: action?.payload?.status
                        }
                    }
                    return data;
                })
            })

        case actionType.DECLINE_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.DELETE_APPOINMENT:
            console.log("GeneralReducer.js: (Admin) - DELETE_APPOINTMENT");
            return ({
                ...state,
                appoinments: state?.appoinments?.filter((data) => data._id !== action?.payload)
            })
        case actionType.DELETE_APPOINMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })
        default:
            return state;
    }
}

export default store; 