import { ADD_COURSE_LOADER, COURSE_LOADING, GET_COURSES } from "../types";

const initialState = {
    courses: [],
    loginLoading: false,
    addloader: false,
    courseLoading: false,
};

export default function coursesReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case ADD_COURSE_LOADER:
            return {
                ...state,
                addloader: payload,
            };
        case COURSE_LOADING:
            return {
                ...state,
                courseLoading: payload,
            };
        case GET_COURSES: {
            return {
                ...state,
                courses: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
