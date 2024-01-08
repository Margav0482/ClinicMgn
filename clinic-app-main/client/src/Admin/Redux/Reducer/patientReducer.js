import * as actionType from '../Action/ActionTypes';

const initialState = {
    patients: [],
    error: "",
    loading: false
}

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PATIENT_LOADING:
            return ({
                ...state,
                loading: true
            })
        case actionType.GET_PATIENT:
            return ({
                ...state,
                patients: action?.payload,
                loading: false
            })
        case actionType.GET_PATIENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.ADD_PATIENT:
            return ({
                ...state,
                patients: [...state.patients, { ...action?.payload }]
            })
        case actionType.ADD_PATIENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.DELETE_PATIENT:
            return ({
                ...state,
                patients: state.patients.filter((patients) => patients?._id !== action?.payload)
            })
        case actionType.DELETE_PATIENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.UPDATE_PATIENT:
            return ({
                ...state,
                patients: state.patients.map((patient) => {
                    if (patient?._id === action?.payload?._id) {
                        return {
                            ...patient,
                            name: action?.payload?.name,
                            age: action?.payload?.age,
                            phone: action?.payload?.phone,
                            email: action?.payload?.email,
                            gender: action?.payload?.gender,
                            weight: action?.payload?.weight,
                            address: action?.payload?.address,
                            date: action?.payload?.date
                        }
                    }
                    return patient
                })
            })
        case actionType.UPDATE_PATIENT_FAILED:
            return ({
                ...state,
                error: action?.payload
            })

        case actionType.REMOVE_PATIENT_ERROR:
            return ({
                ...state,
                error: ""
            })

        default:
            return state
    }

}

export default store; 