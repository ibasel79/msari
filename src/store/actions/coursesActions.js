import firebase from "../../config/firebase";
import {
    LOGIN_LOADER,
    ADD_LOADER,
    GET_JOBS,
    GET_COURSES,
    COURSE_LOADING,
    ADD_COURSE_LOADER,
} from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addLoader = (val) => async (dispatch) => {
    dispatch({
        type: ADD_COURSE_LOADER,
        payload: val,
    });
};
export const getLoader = (val) => async (dispatch) => {
    dispatch({
        type: COURSE_LOADING,
        payload: val,
    });
};
const coursesCollection = firebase.firestore().collection("courses");
export const addCourses =
    (payload, major, onComplete = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            let majors = [];
            for await (let maj of major) {
                majors.push(maj.value);
            }
            coursesCollection
                .doc(payload.courseCode)
                .set({
                    ...payload,
                    majors,
                    createdAt: firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                    toast.success("Courses added successfully !", {
                        autoClose: 2000,
                    });
                    onComplete();
                    dispatch(addLoader(false));
                });
        } catch (error) {
            toast.error(error.message);
            dispatch(addLoader(false));
        }
    };
export const getCourses =
    (onComplete = () => {}) =>
    async (dispatch) => {
        dispatch(getLoader(true));

        coursesCollection.onSnapshot((query) => {
            let tempdata = [];
            query.docs.forEach((doc) => {
                tempdata.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            dispatch({
                type: GET_COURSES,
                payload: tempdata,
            });
            dispatch(getLoader(false));
        });
    };
export const editCourses =
    (payload, id, major, onComplete = () => {}) =>
    async (dispatch) => {
        try {
            dispatch(addLoader(true));
            let majors = [];
            for await (let maj of major) {
                majors.push(maj.value);
            }
            coursesCollection
                .doc(id)
                .set({ ...payload, majors })
                .then(() => {
                    toast.success("Courses updated successfully !", {
                        autoClose: 2000,
                    });
                    dispatch(addLoader(false));

                    onComplete();
                });
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            });
            dispatch(addLoader(false));
            onComplete();
        }
    };
export const deleteCourses =
    (selectedRows, onComplete = () => {}) =>
    async (dispatch) => {
        try {
            for (let i = 0; i < selectedRows.length; i++) {
                await coursesCollection.doc(selectedRows[i]).delete();
            }

            toast.success("Courses deleted successfully !", {
                autoClose: 2000,
            });

            onComplete();
        } catch (error) {
            toast.error(error.message);
            onComplete();
        }
    };
