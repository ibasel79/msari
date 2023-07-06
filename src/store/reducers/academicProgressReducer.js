import { GET_ACADEMIC_PROGRESS } from "../types";

const initialState = {
    progress: "idle",
};

export default function academicProgressReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case GET_ACADEMIC_PROGRESS: {
            return {
                ...state,
                progress: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
