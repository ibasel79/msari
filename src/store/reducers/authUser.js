import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../types";

const initialState = {
    user: null,
    uid: null,
};

/*
    Any action related to Profile will go here.
*/

export default function authUserReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case LOGIN:
            // console.log(payload, "reducer");
            return {
                ...state,
                user: payload,
                uid: payload.uid,
            };
        case LOGOUT:
            console.log("testings");
            localStorage.removeItem("auth");
            return {
                ...state,
                user: null,
                uid: null,
            };
        case UPDATE_PROFILE:
            // For Example, any thing
            return {
                ...state,
                user: payload,
            };
        default:
            return { ...state };
    }
}
