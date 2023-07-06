import firebase from "../../config/firebase";
import { GET_QUESTIONS, GET_QUESTIONS_LOADER } from "../types";
import { toast } from "react-toastify";
export const getLoader = (val) => async (dispatch) => {
    dispatch({
        type: GET_QUESTIONS_LOADER,
        payload: val,
    });
};
export const getQuestions = () => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        await firebase
            .firestore()
            .collection("questions")
            .onSnapshot(async (query) => {
                let tempData = [];
                query.forEach((doc) => {
                    tempData.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                dispatch({
                    type: GET_QUESTIONS,
                    payload: tempData,
                });
                dispatch(getLoader(false));
            });
    } catch (error) {
        dispatch(getLoader(false));

        toast.error(error.message, {
            autoClose: 2000,
        });
    }
};
