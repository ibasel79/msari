import {
    AUTH_NOTIFICATION,
    AUTH_SET_LOADING,
    LOGIN_LOADER,
    REGISTER_LOADER,
} from "../types";

const initialState = {
    notification: {
        message: "",
        type: "",
    },
    loading: false,
    loginLoading: false,
    registerLoading: false,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN_LOADER:
            // console.log("testing", payload);
            return {
                ...state,
                loginLoading: payload,
            };
        case REGISTER_LOADER:
            return {
                ...state,
                registerLoading: payload,
            };
        case AUTH_NOTIFICATION:
            return {
                ...state,
                notification: payload,
            };
        case AUTH_SET_LOADING:
            return {
                ...state,
                loading: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
