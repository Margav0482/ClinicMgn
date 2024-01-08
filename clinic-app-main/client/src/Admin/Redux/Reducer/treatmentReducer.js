import * as actionType from '../Action/ActionTypes';

const initialState = {
    treatmentsDetails: [],
    error: "",
    loading: false
}

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TREATMENT_LOADING:
            return ({
                ...state,
                loading: true
            })

        case actionType.GET_TREATMENT:
            return ({
                ...state,
                treatmentsDetails: action?.payload,
                error: "",
                loading: false
            })
        case actionType.GET_TREATMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.ADD_TREATMENT:
            return ({
                ...state,
                treatmentsDetails: [...state.treatmentsDetails, { ...action?.payload }],
                error: ""
            })
        case actionType.ADD_TREATMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.DELETE_TREATMENT:
            return ({
                ...state,
                treatmentsDetails: state.treatmentsDetails.filter((data) => data._id !== action?.payload)
            })
        case actionType.DELETE_TREATMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.UPDATE_TREATMENT:
            return ({
                ...state,
                treatmentsDetails: state.treatmentsDetails.map((data) => {
                    if (data?._id === action?.payload?._id) {
                        return {
                            ...data,
                            reason: action?.payload?.reason,
                            medicines: action?.payload?.medicines,
                            date: action?.payload?.date,
                            due_days: action?.payload?.due_days,
                            due_date: action?.payload?.due_date,
                            suggestion: action?.payload?.suggestion,
                            description: action?.payload?.description,
                            report_image: action?.payload?.report_image
                        }
                    }
                    return data
                })
            })

        case actionType.UPDATE_TREATMENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.REMOVE_TREATMENT_ERROR:
            return ({
                ...state,
                error: ""
            })
        default:
            return state;
    }
}

export default store;