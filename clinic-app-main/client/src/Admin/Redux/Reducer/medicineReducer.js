import * as actionType from '../Action/ActionTypes';

const initialState = {
    medicines: [],
    message: "",
    error: "",
    loading: false
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MEDICINES_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionType.GET_MEDICINES:
            return {
                ...state,
                medicines: action.medicines,
                loading: false
            }
        case actionType.GET_MEDICINES_FAILED:
            return {
                ...state,
                error: action.error
            }

        case actionType.ADD_MEDICINE:
            return {
                ...state,
                medicines: [...state.medicines, { ...action.medicines }],
                error: "",
            }
        case actionType.ADD_MEDICINE_FAILED:
            return {
                ...state,
                error: action.error
            }

        case actionType.DELETE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.filter((medicine) => medicine?._id !== action.payload)
            }
        case actionType.DELETE_MEDICINE_FAILED:
            return {
                ...state,
                error: action.payload
            }

        case actionType.UPDATE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.map((medicine) => {
                    if (medicine?._id === action.payload._id) {
                        return {
                            ...medicine,
                            medicine_name: action.payload.medicine_name,
                            medicine_description: action.payload.medicine_description
                        }
                    }
                    return medicine
                })
            }
        case actionType.UPDATE_MEDICINE_FAILED:
            return {
                ...state,
                error: action.payload
            }

        case actionType.REMOVE_ERROR:
            return {
                ...state,
                error: ""
            }
        default:
            return state;
    }
}

export default store;