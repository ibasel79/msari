import { EDIT_STUDENT_LOADING, GET_STUDENT, STUDENTS_LOADING } from "../types";
import { LOGIN_LOADER } from "../types";
const initialState = {
    student: [],
    studentLoading: false,
};

export default function studentReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case STUDENTS_LOADING:
            return {
                ...state,
                studentLoading: payload,
            };
        case EDIT_STUDENT_LOADING:
            return {
                ...state,
                editStudentLoading: payload,
            };
        case GET_STUDENT: {
            return {
                ...state,
                student: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
