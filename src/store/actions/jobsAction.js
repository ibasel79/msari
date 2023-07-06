import firebase from "../../config/firebase";
import { GET_JOBS, ADD_JOB_LOADER, GET_JOB_LOADER } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addLoader = (val) => async (dispatch) => {
    dispatch({
        type: ADD_JOB_LOADER,
        payload: val,
    });
};
export const getLoader = (val) => async (dispatch) => {
    dispatch({
        type: GET_JOB_LOADER,
        payload: val,
    });
};
const jobsCollection = firebase.firestore().collection("jobs");
export const addJobs =
    (payload, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            jobsCollection
                .add({
                    ...payload,
                    createdAt: firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                    // alert("Jobs added successfully!");

                    toast.success("Jobs added successfully !", {
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
export const getJobs = (onSuccess = () => {}) => async (dispatch) => {
    dispatch(getLoader(true));

    jobsCollection.onSnapshot((query) => {
        let tempdata = [];
        query.docs.forEach((doc) => {
            tempdata.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        dispatch({
            type: GET_JOBS,
            payload: tempdata,
        });
        onSuccess()
        dispatch(getLoader(false));
    });
};
export const editJobs =
    (id, payload, onSuccess = () => {}) =>
    async (dispatch) => {
        dispatch(addLoader(true));
        jobsCollection
            .doc(id)
            .set({ ...payload })
            .then(() => {
                // alert("Jobs updated successfully!");
                toast.success("Jobs updated successfully !", {
                    autoClose: 2000,
                });

                onSuccess();
                dispatch(addLoader(false));
            });
    };
export const deleteJobs =
    (selectedRows, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            selectedRows.forEach((row) => {
                jobsCollection.doc(row).delete();
            });
            // alert("Jobs deleted successfully!");
            toast.success("Jobs deleted successfully !", {
                autoClose: 2000,
            });

            onSuccess();
            dispatch(addLoader(false));
        } catch (error) {
            toast.error(error.message);
            dispatch(addLoader(false));
        }
    };
