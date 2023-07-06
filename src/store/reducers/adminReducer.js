import { ADMIN_LOADING, GET_ADMIN } from "../types";
import { LOGIN_LOADER, ADD_LOADER } from "../types";
const initialState = {
    admin: [],
    adminLoading: false,
    addloader: false,
};

export default function AdminReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADMIN_LOADING:
            return {
                ...state,
                adminLoading: payload,
            };
        case ADD_LOADER:
            return {
                ...state,
                addloader: payload,
            };
        case GET_ADMIN: {
            return {
                ...state,
                admin: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
