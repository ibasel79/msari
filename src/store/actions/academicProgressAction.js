import firebase from "../../config/firebase";
import { GET_ACADEMIC_PROGRESS } from "../types";
import { toast } from "react-toastify";
const academicProgressCollection = firebase
    .firestore()
    .collection("academicProgress");
export const saveAcademicProgress =
    (payload, questions, id, deletedQuestions, onComplete = () => {}) =>
    async (dispatch) => {
        // console.log("payload", payload);
        // console.log("id", id);
        // console.log("questions", questions);
        try {
            for (let pay of payload) {
                await academicProgressCollection
                    .doc(id)
                    .collection("courses")
                    .doc(pay.id)
                    .set(pay);
            }
            for (let deletedQuestion of deletedQuestions) {
                await academicProgressCollection
                    .doc(id)
                    .collection("courses")
                    .doc(deletedQuestion)
                    .delete();
            }
            await academicProgressCollection.doc(id).set({ ...questions });
            alert("progress added");
        } catch (error) {
            // toast.error(error.message);
            alert(error.message);
        }
    };
export const getAcademicProgress = () => async (dispatch, getState) => {
    let { uid } = getState().authUser;
    academicProgressCollection.doc(uid).onSnapshot(async (query) => {
        if (query.exists) {
            let coursesDocs = await academicProgressCollection
                .doc(uid)
                .collection("courses")
                .get();
            let courses = [];
            for (let coursesDoc of coursesDocs.docs) {
                courses.push({ id: coursesDoc.id, ...coursesDoc.data() });
            }
            let tempdata = { id: query.id, questions: query.data(), courses };
            console.log(tempdata);
            dispatch({
                type: GET_ACADEMIC_PROGRESS,
                payload: tempdata,
            });
        } else {
            dispatch({
                type: GET_ACADEMIC_PROGRESS,
                payload: {},
            });
        }
    });
};
