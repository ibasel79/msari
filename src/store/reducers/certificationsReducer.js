import {
    ADD_CERTIFICATIONS_LOADER,
    GET_CERTIFICATIONS,
    GET_CERTIFICATIONS_LOADER,
    GET_MAJORS,
} from "../types";

const initialState = {
    certifications: [],
    majors: [],
    loginLoading: false,
    addloader: false,
    getLoading: false,
};

export default function certificationsReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case ADD_CERTIFICATIONS_LOADER:
            return {
                ...state,
                addloader: payload,
            };
        case GET_CERTIFICATIONS_LOADER:
            return {
                ...state,
                getLoading: payload,
            };

        case GET_CERTIFICATIONS: {
            return {
                ...state,
                certifications: payload,
            };
        }
        case GET_MAJORS: {
            return {
                ...state,
                majors: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
