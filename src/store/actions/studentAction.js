import firebase from "../../config/firebase";
import {
    ADD_LOADER,
    DELETE_STUDENT_LOADING,
    EDIT_STUDENT_LOADING,
    GET_STUDENT,
    STUDENTS_LOADING,
} from "../types";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../repository/RepositoryFactory";

var student = RepositoryFactory.get("student");

export const getLoading = (val) => async (dispatch) => {
    dispatch({
        type: STUDENTS_LOADING,
        payload: val,
    });
};
export const editLoader = (val) => async (dispatch) => {
    dispatch({
        type: EDIT_STUDENT_LOADING,
        payload: val,
    });
};
export const deleteLoader = (val) => async (dispatch) => {
    dispatch({
        type: DELETE_STUDENT_LOADING,
        payload: val,
    });
};
const studentCollection = firebase.firestore().collection("students");

export const getStudent = () => async (dispatch) => {
    dispatch(getLoading(true));
    try {
        await studentCollection.onSnapshot(async (query) => {
            let tempdata = [];
            query.forEach((doc) => {
                tempdata.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            dispatch({
                type: GET_STUDENT,
                payload: tempdata,
            });
            dispatch(getLoading(false));
        });
    } catch (error) {
        dispatch(getLoading(false));

        toast.warn("student not found", {
            autoClose: 2000,
        });
    }
};
export const addStudent =
    (payload, onComplete = () => {}) =>
    async (dispatch) => {
        try {
            let { data } = await student.addStudent(payload);

            if (data.success) {
                toast.success("Student added successfully !", {
                    autoClose: 2000,
                });
                onComplete({ success: true });
            } else {
                toast.error(data.message, {
                    autoClose: 2000,
                });
                onComplete({ success: false });
            }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
            onComplete({ success: false });
        }
    };
export const editStudent =
    (payload, id, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            let { data } = await student.updateStudent(payload, id);

            if (data.success) {
                toast.success("Student updated successfully !", {
                    autoClose: 2000,
                });
                onSuccess({ success: true });
            } else {
                toast.error(data.message, {
                    autoClose: 2000,
                });
                onSuccess({ success: false });
            }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
        }
    };
export const deleteStudent =
    (selectedRows, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            // dispatch(addLoader(true));
            let deleteIssueArray = [];
            for (let i = 0; i < selectedRows.length; i++) {
                let { data } = await student.deleteStudent(selectedRows[i]);
                if (!data.success) {
                    deleteIssueArray.push(selectedRows[i]);
                }
            }
            if (deleteIssueArray.length === 0) {
                // if (data.data.success) {
                toast.success("Student deleted successfully !", {
                    autoClose: 2000,
                });
                onSuccess();
                // dispatch(addLoader(false));
            } else {
                toast.error(
                    `${
                        selectedRows.length - deleteIssueArray.length
                    } students deleted, but there are issues with ${
                        deleteIssueArray.length
                    }`,
                    {
                        autoClose: 2000,
                    }
                );
                onSuccess();
            }
            // }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
            // dispatch(addLoader(false));
            onSuccess();
        }
    };
