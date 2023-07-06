import firebase from "../../config/firebase";
import { GET_QUESTIONS, ADD_QUESTIONS_LOADER, GET_QUESTIONS_LOADER } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addLoader = (val) => async (dispatch) => {
    dispatch({
        type: ADD_QUESTIONS_LOADER,
        payload: val,
    });
};
export const getLoader = (val) => async (dispatch) => {
    dispatch({
        type: GET_QUESTIONS_LOADER,
        payload: val,
    });
};
const questionsCollection = firebase.firestore().collection("questions");
export const addQuestions =
    (payload, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            questionsCollection
                .add({
                    ...payload,
                    createdAt: firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                    // alert("Questions added successfully!");

                    toast.success("Questions added successfully !", {
                        autoClose: 2000,
                    });
                    onSuccess();
                    dispatch(addLoader(false));
                });
        } catch (error) {
            toast.error(error.message);
            dispatch(addLoader(false));
        }
    };
export const getQuestions = (onSuccess = () => {}) => async (dispatch) => {
    dispatch(getLoader(true));

    questionsCollection.onSnapshot((query) => {
        let tempdata = [];
        query.docs.forEach((doc) => {
            tempdata.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        dispatch({
            type: GET_QUESTIONS,
            payload: tempdata,
        });
        onSuccess()
        dispatch(getLoader(false));
    });
};
export const editQuestions =
    (id, payload, onSuccess = () => {}) =>
    async (dispatch) => {
        dispatch(addLoader(true));
        questionsCollection
            .doc(id)
            .set({ ...payload })
            .then(() => {
                // alert("Questions updated successfully!");
                toast.success("Questions updated successfully !", {
                    autoClose: 2000,
                });

                onSuccess();
                dispatch(addLoader(false));
            });
    };
export const deleteQuestions =
    (selectedRows, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            selectedRows.forEach((row) => {
                questionsCollection.doc(row).delete();
            });
            // alert("Questions deleted successfully!");
            toast.success("Questions deleted successfully !", {
                autoClose: 2000,
            });

            onSuccess();
            dispatch(addLoader(false));
        } catch (error) {
            toast.error(error.message);
            dispatch(addLoader(false));
        }
    };
