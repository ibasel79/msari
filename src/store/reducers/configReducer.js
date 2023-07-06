import { GET_GRADE_FACTOR } from "../types";

const initialState = {
    gradeFactor: "idle",
};

export const configReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GRADE_FACTOR:
            return {
                ...state,
                gradeFactor: payload,
            };
        default:
            return {
                ...state,
            };
    }
};
