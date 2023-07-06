import { ADD_JOB_LOADER, GET_JOBS, GET_JOB_LOADER, GET_LOADER } from "../types";

const initialState = {
    jobs: [],
    loginLoading: false,
    addloader: false,
    getLoading: false,
};

export default function jobsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_JOB_LOADER:
            return {
                ...state,
                addloader: payload,
            };
        case GET_JOB_LOADER:
            return {
                ...state,
                getLoading: payload,
            };
        case GET_JOBS: {
            return {
                ...state,
                jobs: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
