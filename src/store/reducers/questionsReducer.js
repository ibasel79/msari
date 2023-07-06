import { GET_QUESTIONS, GET_QUESTIONS_LOADER } from "../types";

const initialState = {
    questions: [],
    getQuestionsLoader: false,
};

export default function questionsReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case GET_QUESTIONS_LOADER: {
            return {
                ...state,
                getQuestionsLoader: payload,
            };
        }
        case GET_QUESTIONS: {
            return {
                ...state,
                questions: payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
