import firebase from "../../config/firebase";
import { toast } from "react-toastify";
import {
    ADD_CERTIFICATIONS_LOADER,
    GET_CERTIFICATIONS_LOADER,
    GET_CERTIFICATIONS,
    GET_MAJORS,
} from "../types";

export const addLoader = (val) => async (dispatch) => {
    dispatch({
        type: ADD_CERTIFICATIONS_LOADER,
        payload: val,
    });
};
export const getLoader = (val) => async (dispatch) => {
    dispatch({
        type: GET_CERTIFICATIONS_LOADER,
        payload: val,
    });
};

const majorsCollection = firebase.firestore().collection("majors");
export const addCertifications =
    (payload, providers, major, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            let certificationsCollection = firebase
                .firestore()
                .collection("certifications");
            dispatch(addLoader(true));

            let majors = [];
            for await (let maj of major) {
                majors.push(maj.value);
            }
            let provider = providers.value;
            certificationsCollection
                .add({
                    ...payload,
                    majors,
                    provider,

                    createdAt: firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                    toast.success("Certifications added successfully !", {
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
export const getCertifications =
    (major = "all", onSuccess = () => {}) =>
    async (dispatch) => {
        let certificationsCollection = firebase
            .firestore()
            .collection("certifications");
        // console.log(payload, "payload");
        dispatch(getLoader(true));
        if (major !== "all") {
            certificationsCollection = certificationsCollection.where(
                "majors",
                "array-contains",
                major
            );
        }
        certificationsCollection.onSnapshot((query) => {
            let tempdata = [];
            query.docs.forEach((doc) => {
                tempdata.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            dispatch({
                type: GET_CERTIFICATIONS,
                payload: tempdata,
            });
            onSuccess();
            dispatch(getLoader(false));
        });
    };
export const editCertifications =
    (id, payload, providers, major, onSuccess = () => {}) =>
    async (dispatch) => {
        let certificationsCollection = firebase
            .firestore()
            .collection("certifications");
        try {
            dispatch(addLoader(true));
            let majors = [];
            for await (let maj of major) {
                majors.push(maj.value);
            }

            certificationsCollection
                .doc(id)
                .set({ ...payload, majors, provider: providers.value })
                .then(() => {
                    toast.success("Certifications updated successfully !", {
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
export const deleteCertifications =
    (selectedRows, onComplete = () => {}) =>
    async (dispatch) => {
        let certificationsCollection = firebase
            .firestore()
            .collection("certifications");
        try {
            selectedRows.forEach((row) => {
                certificationsCollection.doc(row).delete();
            });

            toast.success("Certifications deleted successfully !", {
                autoClose: 2000,
            });
            onComplete();
        } catch (error) {
            toast.error(error.message);
            onComplete();
        }
    };
export const getMajors = () => async (dispatch) => {
    majorsCollection.onSnapshot((query) => {
        let tempdata = [];
        query.docs.forEach((doc) => {
            tempdata.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        dispatch({
            type: GET_MAJORS,
            payload: tempdata,
        });
    });
};
